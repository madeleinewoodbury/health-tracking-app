import { Prisma } from '@prisma/client'
import prisma from '../db'
import { findOrUpdateLocation } from '../modules/geocoding'

interface SymptomEntry {
	id: string
	severity?: number
	symptomStart?: string
	symptomEnd?: string
	description?: string
}

interface LocationData {
	city: string
	state?: string
	countryCode: string
}

interface UpdateLocationData {
	city?: string | null
	state?: string | null
	countryCode?: string | null
}

/**
 * Creates a user symptom log.
 *
 * @param req - The request object containing user, location, and symptoms data.
 * @param res - The response object used to send back the created symptom log or an error message.
 *
 * @returns A JSON response with the created user symptom log or an error message.
 */
export const createUserSymptomLog = async (req, res) => {
	try {
		// Extract location and symptoms from request body
		const { city, state, countryCode }: LocationData = req.body.location
		const symptoms: SymptomEntry[] = req.body.symptoms

		// Use transaction to ensure all operations succeed or fail together
		const result = await prisma.$transaction(async (tx) => {
			// Find country
			const country = await tx.country.findUniqueOrThrow({
				where: { alpha2: countryCode.toUpperCase() },
			})

			// Find or create location
			const location = await findOrUpdateLocation(tx, city, country, state)

			// Create symptom log
			const userSymptomLog = await tx.userSymptomLog.create({
				data: {
					userId: req.user.id,
					locationId: location.id,
					userSymptomEntries: {
						// Bulk create symptom entries
						createMany: {
							data: symptoms.map((symptom) => ({
								symptomId: symptom.id,
								severity: symptom.severity || null,
								symptomStart: symptom.symptomStart
									? new Date(symptom.symptomStart)
									: null,
								symptomEnd: symptom.symptomEnd
									? new Date(symptom.symptomEnd)
									: null,
								description: symptom.description || null,
							})),
						},
					},
				},
				// Include related data in response
				include: {
					location: true,
					userSymptomEntries: true,
				},
			})

			return userSymptomLog
		})

		// Send response with created user symptom log
		res.json({ data: result })
	} catch (error) {
		console.error('Failed to update symptom log:', error)
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return res.status(400).json({ error: 'Invalid data provided' })
		} else if (error.name === 'GeocodingError') {
			return res.status(400).json({ error: error.message })
		}

		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Retrieves all symptom logs for the authenticated user.
 *
 * @param req - The request object, containing the authenticated user's information.
 * @param res - The response object used to send back the retrieved symptom logs or an error message.
 *
 * @returns A JSON response containing the user's symptom logs or an error message if the operation fails.
 */
export const getUserSymptomLogs = async (req, res) => {
	try {
		// Find all logs that belongs to the user
		const userSymptomLogs = await prisma.userSymptomLog.findMany({
			where: { userId: req.user.id },
			select: {
				id: true,
				recordedAt: true,
				location: {
					select: {
						city: true,
						state: true,
						country: {
							select: {
								name: true,
							},
						},
					},
				},
				userSymptomEntries: {
					select: {
						severity: true,
						symptomStart: true,
						symptomEnd: true,
						description: true,
						symptom: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		})

		// Send response with user symptom logs
		res.json({ count: userSymptomLogs.length, data: userSymptomLogs })
	} catch (error) {
		console.error('Failed to get user symptom log:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Retrieves a user symptom log by its ID and the user's ID.
 *
 * @param req - The request object containing the parameters and user information.
 * @param res - The response object used to send the response.
 * @returns A JSON response containing the user symptom log data or an error message.
 *
 */
export const getUserSymptomLogById = async (req, res) => {
	try {
		// Find the log by id and user id
		const userSymptomLog = await prisma.userSymptomLog.findUnique({
			where: { id: req.params.id, userId: req.user.id },
			select: {
				id: true,
				recordedAt: true,
				location: {
					select: {
						city: true,
						state: true,
						country: {
							select: {
								name: true,
							},
						},
					},
				},
				userSymptomEntries: {
					select: {
						severity: true,
						symptomStart: true,
						symptomEnd: true,
						description: true,
						symptom: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		})

		if (!userSymptomLog) {
			return res.status(404).json({ error: 'Symptom log not found' })
		}

		// Send response with user symptom log
		res.json({ data: userSymptomLog })
	} catch (error) {
		console.error('Failed to get user symptom log by id:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Updates a user's symptom log.
 *
 * This function handles the updating of a user's symptom log by finding the log by its ID and the user's ID,
 * updating the location if provided, deleting existing symptom entries, creating new symptom entries, and
 * updating the symptom log with the new location and entries. It uses a transaction to ensure all operations
 * succeed or fail together.
 *
 * @param req - The request object containing the log ID, user ID, and the new symptom log data.
 * @param res - The response object used to send the result or an error message.
 *
 * @returns A JSON response with the updated user symptom log or an error message.
 */
export const updateSymptomLog = async (req, res) => {
	try {
		// Find the log by id and user id
		const userSymptomLog = await prisma.userSymptomLog.findUnique({
			where: { id: req.params.logId, userId: req.user.id },
			select: {
				id: true,
				locationId: true,
				location: {
					select: {
						city: true,
						state: true,
						countryId: true,
						country: {
							// Add country relation
							select: {
								id: true,
								name: true,
								alpha2: true,
							},
						},
					},
				},
			},
		})

		if (!userSymptomLog) {
			return res.status(404).json({ error: 'Symptom log not found' })
		}

		const symptoms: SymptomEntry[] = req.body.symptoms
		const { location } = req.body

		// Use transaction to ensure all operations succeed or fail together
		const result = await prisma.$transaction(async (tx) => {
			let locationId = userSymptomLog.locationId

			// Update location if provided
			if (location) {
				const city = location.city || userSymptomLog.location.city
				const state = location.state || userSymptomLog.location.state
				let country = userSymptomLog.location.country

				if (location.countryCode) {
					country = await tx.country.findUniqueOrThrow({
						where: { alpha2: location.countryCode.toUpperCase() },
					})
				}

				const newLocation = await findOrUpdateLocation(tx, city, country, state)
				locationId = newLocation.id
			}

			// Delete existing symptom entries
			await tx.userSymptomEntry.deleteMany({
				where: { logId: userSymptomLog.id },
			})

			// Create new symptom entries
			await tx.userSymptomEntry.createMany({
				data: symptoms.map((symptom) => ({
					logId: userSymptomLog.id,
					symptomId: symptom.id,
					severity: symptom.severity || null,
					symptomStart: symptom.symptomStart
						? new Date(symptom.symptomStart)
						: null,
					symptomEnd: symptom.symptomEnd ? new Date(symptom.symptomEnd) : null,
					description: symptom.description || null,
				})),
			})

			// Update the symptom log with new location and entries
			return await tx.userSymptomLog.update({
				where: { id: userSymptomLog.id },
				data: {
					locationId,
				},
				include: {
					location: true,
					userSymptomEntries: true,
				},
			})
		})

		// Send response with updated user symptom log
		res.json({ data: result })
	} catch (error) {
		console.error('Failed to update symptom log:', error)
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return res.status(400).json({ error: 'Invalid data provided' })
		} else if (error.name === 'GeocodingError') {
			return res.status(400).json({ error: error.message })
		}

		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Deletes a user symptom log by its ID and the user ID, along with all related entries.
 *
 * @param req - The request object containing the log ID in the parameters and the user ID in the user object.
 * @param res - The response object used to send the result or error message.
 * @returns A JSON response with the deleted user symptom log data or an error message.
 */
export const deleteUserSymptomLog = async (req, res) => {
	try {
		// Delete the log
		const deletedLog = await prisma.userSymptomLog.delete({
			where: { id: req.params.logId, userId: req.user.id },
		})

		// Send response with deleted user symptom log
		res.json({ data: deletedLog })
	} catch (error) {
		console.error('Failed to delete user symptom log:', error)
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return res.status(400).json({ error: 'Invalid data provided' })
		}
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
