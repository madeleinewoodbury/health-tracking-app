import prisma from '../db'
import { createJWT, hashPassword } from '../modules/auth'

export const createUser = async (req, res) => {
	try {
		// Create the user in the database
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				email: req.body.email,
				password: await hashPassword(req.body.password),
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				dob: new Date(req.body.dob),
			},
		})

		// Create a JWT token
		const token = createJWT(user)

		// Send the token to the user
		res.json({ token })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Internal Server Error' })
	}
}
