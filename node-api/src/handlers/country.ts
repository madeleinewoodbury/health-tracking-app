import { Prisma } from '@prisma/client'
import prisma from '../db'

/**
 * Creates a new country entry in the database.
 *
 * @param req - The request object containing the country data in the body.
 * @param res - The response object used to send back the created country data or an error message.
 * @returns A JSON response with the created country data or an error message.

 */
export const createCountry = async (req, res) => {
	try {
		const country = await prisma.country.create({
			data: req.body,
		})

		res.json({ data: country })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/**
 * Updates a country entry in the database.
 *
 * @param req - The request object containing the country data in the body and the country id in the URL.
 * @param res - The response object used to send back the updated country data or an error message.
 * @returns A JSON response with the updated country data or an error message.
 */
export const updateCountry = async (req, res) => {
	try {
		const country = await prisma.country.update({
			where: { id: req.params.id },
			data: req.body,
		})

		res.json({ data: country })
	} catch (error) {
		console.log(error.message)
		res.status(404).json({ error: 'Country not found' })
	}
}

/**
 * Gets all the countries from the database.
 *
 * @param req - The request object containing the limit and offset for the query.
 * @param res - The response object used to send back the countries or an error message.
 * @returns A JSON response with the countries if successful.
 */
export const getCountries = async (req, res) => {
	try {
		// The options object is used to set the limit, offset, and order of the query.
		// Gets all countries if no limit or offset is provided.
		const options = {
			...(req.query.limit && { take: parseInt(req.query.limit) }),
			...(req.query.offset && { skip: parseInt(req.query.offset) }),
			orderBy: {
				name: 'asc' as Prisma.SortOrder,
			},
		}

		const countries = await prisma.country.findMany({
			...options,
			select: {
				id: true,
				name: true,
				alpha2: true,
			},
			where: {
				active: true,
			},
		})

		res.json({ count: countries.length, data: countries })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/**
 * Gets a country from the database by its id.
 *
 * @param req - The request object containing the country id in the URL.
 * @param res - The response object used to send back the country data or an error message.
 * @returns A JSON response with the country data if successful.
 */
export const getCountry = async (req, res) => {
	try {
		const country = await prisma.country.findUnique({
			where: { id: req.params.id },
		})

		res.json({ data: country })
	} catch (error) {
		res.status(404).json({ error: 'Country not found' })
	}
}

/**
 * Deletes a country from the database by its id.
 *
 * @param req - The request object containing the country id in the URL.
 * @param res - The response object used to send back a success message or an error message.
 * @returns A JSON response with a success message if successful.
 */
export const deleteCountry = async (req, res) => {
	try {
		await prisma.country.delete({
			where: { id: req.params.id },
		})

		res.json({ message: 'Country deleted' })
	} catch (error) {
		res.status(404).json({ error: 'Country not found' })
	}
}
