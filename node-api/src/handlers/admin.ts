import prisma from '../db'

/**
 * Handles the request to get user activity per date.
 *
 * This function fetches activity logs from the database and sends them to an external
 * service for further processing. The response from the external service is then
 * returned to the client.
 */
export const getUserActivtyPerDay = async (req, res) => {
	try {
		// Fetch the activities from the database
		const activities = await prisma.activityLog.findMany({
			select: {
				userId: true,
				method: true,
				endpoint: true,
				recordedAt: true,
			},
		})

		if (!activities) {
			throw new Error('No activities found')
		}

		const response = await fetch(
			'http://127.0.0.1:8000/activity-tracking/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(activities),
			}
		)

		if (!response.ok) {
			throw new Error('Failed to fetch data')
		}

		const data = await response.json()

		res.json(data)
	} catch (error) {
		console.error('Failed to get activity:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Handles the request to get trends in symptom reporting across different locations.
 */
export const getGeographicTrends = async (req, res) => {
	try {
		// Get symptom logs from the database
		const queryResults = await prisma.userSymptomLog.findMany({
			select: {
				location: {
					select: {
						country: {
							select: {
								name: true,
							},
						},
						city: true,
					},
				},
				userSymptomEntries: {
					select: {
						symptom: {
							select: {
								name: true,
							},
						},
					},
				},
				recordedAt: true,
			},
		})

		if (!queryResults) {
			throw new Error('No symptom logs found')
		}

		// Transform the data and send it to an external service
		const symptomLogs = queryResults.map((log) => {
			return {
				country: log.location.country.name,
				city: log.location.city,
				symptoms: log.userSymptomEntries.map((entry) => entry.symptom.name),
				recordedAt: log.recordedAt,
			}
		})

		console.log('Sending data to external service')
		const response = await fetch(
			'http://127.0.0.1:8000/activity-tracking/geography',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(symptomLogs),
			}
		)

		if (!response.ok) {
			throw new Error('Failed to fetch data')
		}

		const data = await response.json()
		res.json(data)
	} catch (error) {
		console.error('Failed to get geographic trends:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
