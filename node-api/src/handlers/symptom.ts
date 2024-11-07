import prisma from '../db'

/**
 * Creates a new symptom entry in the database.
 *
 * @param req - The request object containing the symptom data in the body.
 * @param res - The response object used to send back the created symptom or an error message.
 *
 * @returns A JSON object containing the created symptom if successful.
 */
export const createSymptom = async (req, res) => {
	try {
		const symptom = await prisma.symptom.create({
			data: req.body,
		})

		res.json({ data: symptom })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/**
 * Updates a symptom entry in the database.
 *
 * @param req - The request object containing the symptom data in the body and the symptom id in the URL.
 * @param res - The response object used to send back the updated symptom or an error message.
 *
 * @returns A JSON object containing the updated symptom if successful.
 */
export const updateSymptom = async (req, res) => {
	try {
		// Get the symptom by the id and update it with the new data
		const symptom = await prisma.symptom.update({
			where: { id: req.params.id },
			data: req.body,
		})

		res.json({ data: symptom })
	} catch (error) {
		console.log(error.message)
		res.status(404).json({ error: 'Symptom not found' })
	}
}

/**
 * Gets all the symptoms from the database.
 *
 * @param req - The request object containing the limit and offset for the query.
 * @param res - The response object used to send back the symptoms or an error message.
 *
 * @returns A JSON object containing the symptoms if successful.
 */
export const getSymptoms = async (req, res) => {
	try {
		// Set the limit and offset for the query
		const limit = req.query.limit ? parseInt(req.query.limit) : 10
		const offset = req.query.offset ? parseInt(req.query.offset) : 0

		const symptoms = await prisma.symptom.findMany({
			skip: offset,
			take: limit,
			orderBy: {
				name: 'asc',
			},
		})

		res.json({ count: symptoms.length, data: symptoms })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/**
 * Gets a symptom by its id from the database.
 *
 * @param req - The request object containing the symptom id in the URL.
 * @param res - The response object used to send back the symptom or an error message.
 *
 * @returns A JSON object containing the symptom if successful.
 */
export const getSymptomById = async (req, res) => {
	try {
		const symptom = await prisma.symptom.findUnique({
			where: { id: req.params.id },
		})

		if (!symptom) {
			res.status(404).json({ error: 'Symptom not found' })
			return
		}

		res.json({ data: symptom })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/**
 * Deletes a symptom by its id from the database.
 *
 * @param req - The request object containing the symptom id in the URL.
 * @param res - The response object used to send back the deleted symptom or an error message.
 *
 * @returns A JSON object containing the deleted symptom if successful.
 */
export const deleteSymptom = async (req, res) => {
	try {
		const symptom = await prisma.symptom.delete({
			where: { id: req.params.id },
		})

		res.json({ data: symptom })
	} catch (error) {
		console.log(error.message)
		res.status(404).json({ error: 'Symptom not found' })
	}
}
