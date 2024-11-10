import { Prisma } from '@prisma/client'
import prisma from '../db'
import { findOrUpdateLocation } from '../modules/geocoding'

interface LocationData {
	city: string
	state?: string
	countryCode: string
}

/**
 * Creates a new provider profile.
 *
 * @param req - The request object containing the provider and location details.
 * @param res - The response object used to send the result or error.
 * @returns A JSON response with the created provider profile or an error message.
 *
 */
export const createProvider = async (req, res) => {
	try {
		// Extract location and symptoms from request body
		const { city, state, countryCode }: LocationData = req.body.location

		// Use transaction to ensure all operations succeed or fail together
		const result = await prisma.$transaction(async (tx) => {
			// Find country
			const country = await tx.country.findUniqueOrThrow({
				where: { alpha2: countryCode.toUpperCase() },
			})

			// Find or create location
			const location = await findOrUpdateLocation(tx, city, country, state)

			console.log(req.body)

			// Create provider profile
			const provider = await tx.providerProfile.create({
				data: {
					providerId: req.user.id,
					locationId: location.id,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					specialty: req.body.specialty,
					title: req.body.title || null,
				},
				include: {
					location: true,
				},
			})

			return provider
		})

		// Send response with created user symptom log
		res.json({ data: result })
	} catch (error) {
		console.error(error)
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return res.status(400).json({ error: 'Invalid data provided' })
		} else if (error.name === 'GeocodingError') {
			return res.status(400).json({ error: error.message })
		}

		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Handler to get all provider profiles.
 *
 * This function fetches all provider profiles from the database, including their locations,
 * and sends a JSON response with the count of providers and the provider data.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the count of providers and the provider data.
 */
export const getProvider = async (req, res) => {
	try {
		// Get all providers
		const providers = await prisma.providerProfile.findMany({
			include: {
				location: true,
			},
		})

		// Send response with provider list
		res.json({ count: providers.length, data: providers })
	} catch (error) {
		console.error('Failed to fetch providers:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Retrieves a provider by their ID.
 *
 * @param req - The request object containing the provider ID in the parameters.
 * @param res - The response object used to send back the provider details or an error message.
 * @returns A JSON response with the provider details if found, or an error message if an error occurs.
 */
export const getProviderById = async (req, res) => {
	try {
		// Get provider by ID
		const provider = await prisma.providerProfile.findUnique({
			where: { id: req.params.id },
			include: {
				location: true,
			},
		})

		// Send response with provider details
		res.json({ data: provider })
	} catch (error) {
		console.error('Failed to fetch provider:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Updates the provider profile based on the provided request data.
 *
 * @param req - The request object containing the provider ID, user ID, and update data.
 * @param res - The response object used to send the result or error message.
 *
 * @returns A JSON response with the updated provider profile or an error message.
 */
export const updateProvider = async (req, res) => {
	try {
		// Find the provider by ID and check if the user is the provider
		const provider = await prisma.providerProfile.findUnique({
			where: { id: req.params.id, providerId: req.user.id },
			select: {
				id: true,
				locationId: true,
				providerId: true,
				firstName: true,
				lastName: true,
				specialty: true,
				title: true,
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

		if (!provider) {
			return res.status(404).json({ error: 'Provider not found' })
		}

		const { location } = req.body

		// Use transaction to ensure all operations succeed or fail together
		const result = await prisma.$transaction(async (tx) => {
			let locationId = provider.locationId

			// Update location if provided
			if (location) {
				const city = location.city || provider.location.city
				const state = location.state || provider.location.state
				let country = provider.location.country

				if (location.countryCode) {
					country = await tx.country.findUniqueOrThrow({
						where: { alpha2: location.countryCode.toUpperCase() },
					})
				}

				const newLocation = await findOrUpdateLocation(tx, city, country, state)
				locationId = newLocation.id
			}

			// Update the symptom log with new location and entries
			return await tx.providerProfile.update({
				where: { id: req.params.id },
				data: {
					locationId: locationId,
					firstName: req.body.firstName || provider.firstName,
					lastName: req.body.lastName || provider.lastName,
					specialty: req.body.specialty || provider.specialty,
					title: req.body.title || provider.title,
				},
				include: {
					location: true,
				},
			})
		})

		// Send response with updated user symptom log
		res.json({ data: result })
	} catch (error) {
		console.error('Failed to update provider profilw:', error)
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return res.status(400).json({ error: 'Invalid data provided' })
		} else if (error.name === 'GeocodingError') {
			return res.status(400).json({ error: error.message })
		}

		res.status(500).json({ error: 'Internal Server Error' })
	}
}

/**
 * Deletes a provider profile based on the provided request parameters.
 *
 * @param req - The request object containing the provider profile ID and user information.
 * @param res - The response object used to send the result of the deletion operation.
 *
 * @returns A JSON response with the deleted provider profile data or an error message.
 */
export const deletedProvider = async (req, res) => {
	try {
		// Delete the provider profile
		const deletedProvider = await prisma.providerProfile.delete({
			where: { id: req.params.id, providerId: req.user.id },
		})

		// Send response with deleted user symptom log
		res.json({ data: deletedProvider })
	} catch (error) {
		console.error('Failed to delete provider profile:', error)
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return res.status(400).json({ error: 'Invalid data provided' })
		}
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
