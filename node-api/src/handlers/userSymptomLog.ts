import { Prisma } from '@prisma/client'
import prisma from '../db'
import { findOrUpdateLocation } from '../modules/geocoding'

interface SymptomEntry {
	id: string
	severity?: number
	startDate?: string
	endDate?: string
	description?: string
}

interface LocationData {
	city: string
	state?: string
	countryCode: string
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
			const country = await tx.country
				.findUniqueOrThrow({
					where: { alpha2: countryCode.toUpperCase() },
				})
				.catch(() => {
					throw new Error('Invalid country code')
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
								symptomStart: symptom.startDate
									? new Date(symptom.startDate)
									: null,
								symptomEnd: symptom.endDate ? new Date(symptom.endDate) : null,
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
		console.error('Failed to create symptom log:', error)

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			res.status(400).json({ error: 'Invalid data provided' })
		} else {
			res.status(500).json({ error: 'Internal Server Error' })
		}
	}
}
