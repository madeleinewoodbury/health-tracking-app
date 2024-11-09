import prisma from '../db'
import { createJWT, hashPassword, comparePasswords } from '../modules/auth'

/**
 * Creates a new user in the database and returns a JWT token.
 *
 * @param req - The request object containing user details in the body.
 * @param res - The response object used to send back the JWT token or an error message.
 *
 * @returns A JSON object containing the JWT token if the user is successfully created.
 */
export const createUser = async (req, res) => {
	try {
		const alpha2 = req.body.nationality.toUpperCase()

		// Find the country in the database
		const country = await prisma.country.findFirst({
			where: { alpha2 },
		})

		// Check if the country exists
		if (!country) {
			res.status(400).json({ message: 'Invalid Country' })
			return
		}

		// Create the user in the database
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				email: req.body.email,
				password: await hashPassword(req.body.password),
				age: req.body.age,
				gender: req.body.gender,
				country: {
					connect: {
						alpha2,
					},
				},
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

/**
 * Verifies the user credentials and returns a JWT token. Username or email can be used to authenticate * the user.
 *
 * @param req - The request object containing user details in the body.
 * @param res - The response object used to send back the JWT token or an error message.
 *
 * @returns A JSON object containing the JWT token if the user is successfully authenticated.
 */
export const signIn = async (req, res) => {
	try {
		// Find the user in the database by username or email
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ username: req.body.identifier }, { email: req.body.identifier }],
			},
		})

		// Check if the user exists
		if (!user) {
			throw new Error('Invalid Credentials')
		}

		// Compare the password with the hashed password
		const isValid = await comparePasswords(req.body.password, user.password)

		// Check if the password is valid
		if (!isValid) {
			throw new Error('Invalid Credentials')
		}

		// Create a JWT token
		const token = createJWT(user)

		// Send the token to the user
		res.json({ token })
	} catch (error) {
		console.error(error)
		res.status(401).json({ message: error.message })
	}
}
