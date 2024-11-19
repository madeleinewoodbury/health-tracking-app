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
			select: {
				username: true,
				email: true,
				age: true,
				gender: true,
				role: true,
				country: {
					select: {
						name: true,
						alpha2: true,
					},
				},
			},
		})

		// Create a JWT token
		const token = createJWT(user)

		// Send the token to the user
		res.json({ token: token, user: user })
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
			select: {
				id: true,
				username: true,
				password: true,
				email: true,
				age: true,
				gender: true,
				role: true,
				country: {
					select: {
						name: true,
						alpha2: true,
					},
				},
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

		// Omit the password from the user data
		const { id, password, ...userData } = user

		// Send the token to the user
		res.json({ token: token, user: userData })
	} catch (error) {
		console.error(error)
		res.status(401).json({ message: error.message })
	}
}

/**
 * Retrieves the user information based on the user ID present in the request.
 *
 * @param req - The request object containing the user ID.
 * @param res - The response object used to send back the user data or an error message.
 *
 * @returns A JSON response containing the user data if found, otherwise an error message.
 */
export const getUser = async (req, res) => {
	try {
		// Find the user in the database by username or email
		const user = await prisma.user.findUnique({
			where: {
				id: req.user.id,
			},
			select: {
				username: true,
				email: true,
				age: true,
				role: true,
				gender: true,
				country: {
					select: {
						name: true,
						alpha2: true,
					},
				},
			},
		})

		// Check if the user exists
		if (!user) {
			throw new Error('User not found')
		}

		// Send the user data
		res.json({ user: user })
	} catch (error) {
		console.error(error)
		res.status(404).json({ message: error.message })
	}
}
