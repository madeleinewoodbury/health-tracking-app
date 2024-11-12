import prisma from '../db'

/**
 * Retrieves symptom logs from the database with optional sorting and pagination.
 *
 * @param {Request} req - The request object containing query parameters for sorting and pagination.
 * @param {Response} res - The response object used to send the retrieved symptom logs or an error message.
 *
 * @query {string} [order='desc'] - The order in which to sort the results (asc or desc).
 * @query {string} [sortBy] - The field by which to sort the results (date, city, country, age, gender).
 * @query {number} [limit=10] - The maximum number of results to return.
 * @query {number} [offset=0] - The number of results to skip before starting to collect the result set.
 *
 * @returns A JSON response containing the retrieved symptom logs and pagination information.
 */
export const getSymptomLogs = async (req, res) => {
	try {
		// Get the order and set the default to 'desc'
		const order = req.query.order || 'desc'
		// Build the sort object
		let orderBy = {}
		switch (req.query.sortBy) {
			case 'date':
				orderBy = { recordedAt: order }
				break
			case 'city':
				orderBy = { location: { city: order } }
				break
			case 'country':
				orderBy = { location: { country: { name: order } } }
				break
			case 'age':
				orderBy = { user: { age: order } }
				break
			case 'gender':
				orderBy = { user: { gender: order } }
			default:
				// Default to sorting by date in descending order
				orderBy = { recordedAt: 'desc' }
		}

		// Get the symptom logs and the total count of logs
		const [logs, total] = await prisma.$transaction([
			prisma.userSymptomLog.findMany({
				select: {
					id: true,
					recordedAt: true,
					location: {
						select: {
							city: true,
							state: true,
							country: { select: { name: true } },
						},
					},
					user: {
						select: {
							id: true,
							age: true,
							gender: true,
							country: { select: { name: true } },
						},
					},
					userSymptomEntries: {
						select: {
							severity: true,
							symptomStart: true,
							symptomEnd: true,
							description: true,
							symptom: { select: { id: true, name: true } },
						},
					},
				},
				orderBy,
				take: req.query.limit ? parseInt(req.query.limit as string) : 10,
				skip: req.query.offset ? parseInt(req.query.offset as string) : 0,
			}),
			prisma.userSymptomLog.count(),
		])

		// Return the logs and pagination information
		res.json({
			pagination: {
				total,
				page: Math.floor((req.query.offset || 0) / (req.query.limit || 10)) + 1,
				pageSize:
					parseInt(req.query.limit as string) || (total > 10 ? 10 : total),
			},
			data: logs,
		})
	} catch (error) {
		console.error('Failed to get symptom logs:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
