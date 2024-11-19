import prisma from '../db'

export const getActivty = async (req, res) => {
	try {
		const response = await fetch('http://127.0.0.1:8000')

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
