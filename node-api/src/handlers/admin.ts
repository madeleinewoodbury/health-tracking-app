import prisma from '../db'

/**
 * Retrieves the number of unique users' activity per day from the database.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing an array of objects with the date and the count of unique users for each day.
 */
export const getUserActivtyPerDay = async (req, res) => {
	try {
		// Fetch activity logs from the database and group them by date and count the number of unique users
		const result: { date: string; uniqueUsers: bigint }[] =
			await prisma.$queryRaw`
			SELECT 
				DATE("recordedAt") as date, 
				COUNT(DISTINCT "userId") as "uniqueUsers"
			FROM "ActivityLog"
			GROUP BY DATE("recordedAt")
			ORDER BY DATE("recordedAt")
		`

		// Format the date and convert the uniqueUsers count to a number
		const data = result.map((row) => ({
			date: new Date(row.date).toISOString().split('T')[0],
			// Convert BigInt to Number
			uniqueUsers: Number(row.uniqueUsers),
		}))

		res.json(data)
	} catch (error) {
		console.error('Failed to get activity:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Retrieves symptom counts by location from the database.
 *
 * @param req - The request object containing the query with `country`, `city`, and `state`.
 * @param res - The response object used to send back the symptom counts or an error message.
 *
 * @returns A JSON response containing the location details and aggregated symptom counts.
 */
export const getSymptomCountsByLocation = async (req, res) => {
	try {
		const { country, city, state } = req.query

		// Get location data from the database
		const location = await prisma.location.findFirst({
			where: {
				city,
				state,
				country: {
					name: country,
				},
			},
			select: {
				id: true,
				city: true,
				state: true,
				country: {
					select: {
						name: true,
					},
				},
			},
		})

		// If location is not found, return an error
		if (!location) {
			return res.status(404).json({ error: 'Location not found' })
		}

		// Get aggregated symptom counts for the location
		const symptoms = await prisma.userSymptomEntry.groupBy({
			by: ['symptomId'],
			_count: {
				symptomId: true,
			},
			where: {
				log: {
					locationId: location.id,
				},
			},
		})

		// Join symptom names with their counts
		const symptomDetails = await Promise.all(
			// Map over each symptom and get the name
			symptoms.map(async (symptom) => {
				const symptomInfo = await prisma.symptom.findUnique({
					where: { id: symptom.symptomId },
					select: { name: true },
				})

				return {
					symptom: symptomInfo.name,
					count: symptom._count.symptomId,
				}
			})
		)

		// Construct the response
		const response = {
			country: location.country.name,
			city: location.city,
			state: location.state || null,
			symptoms: symptomDetails,
		}

		res.json(response)
	} catch (error) {
		console.error('Failed to fetch symptom counts:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Retrieves common symptom patterns associated with a given symptom.
 *
 * @param req - The request object containing the symptom name in the query.
 * @param res - The response object used to send the result or an error message.
 *
 * @returns A JSON response with an array of common symptoms and their counts, or an error message.
 */
export const getSymptomPatterns = async (req, res) => {
	try {
		const { symptom } = req.query

		// Find the symptom ID for the given symptom name
		const symptomRecord = await prisma.symptom.findUnique({
			where: { name: symptom },
			select: { id: true },
		})

		if (!symptomRecord) {
			return res.status(404).json({ error: 'Symptom not found' })
		}

		// Get logs that include the given symptom
		const symptomLogs = await prisma.userSymptomLog.findMany({
			where: {
				userSymptomEntries: {
					some: {
						symptomId: symptomRecord.id,
					},
				},
			},
			select: {
				userSymptomEntries: {
					select: {
						symptom: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		})

		// Aggregate and count occurrences of other symptoms
		const symptomCounts = symptomLogs.reduce((acc, log) => {
			log.userSymptomEntries.forEach((entry) => {
				if (entry.symptom.name !== symptom) {
					// Increment the count for the symptom name
					acc[entry.symptom.name] = (acc[entry.symptom.name] || 0) + 1
				}
			})
			return acc
		}, {})

		// Convert the counts object to an array and sort by count
		const commonSymptoms = Object.entries(symptomCounts)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => Number(b.count) - Number(a.count))

		res.json(commonSymptoms)
	} catch (error) {
		console.error('Failed to get symptom patterns:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
