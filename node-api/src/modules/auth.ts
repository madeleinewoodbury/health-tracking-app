import prisma from '../db'
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

/**
 * Creates a JSON Web Token (JWT) for the given user.
 *
 * @param {Object} user - The user object for whom the JWT is being created.
 * @param {string} user.id - The unique identifier of the user.
 * @param {string} user.username - The username of the user.
 * @returns {string} The generated JWT token.
 */
export const createJWT = (user) => {
	// Create a JWT token
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	)
	return token
}

/**
 * Compares a plain text password with a hashed password.
 *
 * @param password - The plain text password to compare.
 * @param hash - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash)
}

/**
 * Hashes the given password using bcrypt with a salt of 10.
 *
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
export const hashPassword = (password) => {
	// Hash the password with a salt of 10
	return bcrypt.hash(password, 10)
}

/**
 * Retrieves the signed-in user based on the provided authorization token in the request headers.
 *
 * @param req - The request object containing the authorization token in the headers.
 * @returns The user object corresponding to the token.
 * @throws Will throw an error if the token is missing, invalid, expired, or if the user does not exist.
 */
const getSignedInUser = async (req) => {
	// Get the token from the request headers
	const bearerToken = req.headers.authorization

	// Check if the token exists
	if (!bearerToken) {
		throw new Error('Missing token')
	}

	// Get the token from the bearer token
	const token = bearerToken.split(' ')[1]

	// Verify the token
	let payload
	try {
		payload = jwt.verify(token, process.env.JWT_SECRET)
	} catch (error) {
		throw new Error('Invalid or expired token')
	}

	// Get the user from the payload
	const user = await prisma.user.findUnique({
		where: {
			id: payload.id,
		},
	})

	// Check if the user exists
	if (!user) {
		throw new Error('Unauthorized')
	}

	return user
}

/**
 * Middleware to protect routes by ensuring the user is authenticated.
 *
 * This function checks if the user is signed in by calling the `getSignedInUser` function.
 * If the user is authenticated, it attaches the user object to the request object and calls the next middleware.
 * If the user is not authenticated, it responds with a 401 status and an error message.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 *
 * @returns {Promise<void>} Resolves when the user is authenticated or sends a 401 response if unauthorized.
 */
export const protect = async (req, res, next) => {
	try {
		const user = await getSignedInUser(req)

		// Attach the user to the request object
		req.user = user
		next()
	} catch (error) {
		res.status(401).json({ error: error.message })
	}
}

/**
 * Middleware to restrict access based on user roles.
 *
 * @param {string[]} roles - An array of allowed roles.
 * @returns {Function} Middleware function to check user role.
 */
const requireRole = (roles) => (req, res, next) => {
	try {
		// Ensure user is attached to the request by the protect middleware
		const user = req.user
		if (!user) {
			throw new Error('Unauthorized')
		}

		// Check if the user's role is within the allowed roles
		if (!roles.includes(user.role)) {
			throw new Error('Permission denied')
		}

		next()
	} catch (error) {
		res.status(403).json({ error: error.message })
	}
}

// Role-based middleware for checking if the user is an admin or provider
export const isAdminOrProvider = requireRole(['ADMIN', 'PROVIDER'])
export const isAdmin = requireRole(['ADMIN'])
export const isProvider = requireRole(['PROVIDER'])
export const isUser = requireRole(['USER'])
