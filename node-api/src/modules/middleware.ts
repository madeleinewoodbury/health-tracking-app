import { Express } from 'express'
import { validationResult } from 'express-validator'
import path from 'path'
import prisma from '../db'

/**
 * This middleware function checks if there are any errors in the request body
 * and returns a 400 status code with the errors if there are any.
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const handleInputErrors = (req, res, next) => {
	const errors = validationResult(req)
	// Check if there are any errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	next()
}

/**
 * Middleware function to log user activity.
 *
 * This middleware logs the details of each request made by a user, including
 * the user ID, role, IP address, request method, and endpoint. The log is
 * stored in the database using Prisma.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns A promise that resolves when the logging is complete and the next
 * middleware function is called.
 */
export const logger = async (req, res, next) => {
	try {
		console.log('Logging user activity...')
		const userId = req.user.id
		const role = req.user.role
		const ipAddress = req.ip

		// Get the request method and URL
		const method = req.method
		const endpoint = req.originalUrl

		// Log the request in the database
		await prisma.activityLog.create({
			data: {
				user: { connect: { id: userId } },
				role,
				ipAddress,
				method,
				endpoint,
			},
		})

		next()
	} catch (error) {
		console.log(`Error in activity log middleware: ${error}`)
	}
}

/**
 * Sets up the ReDoc middleware for the provided Express application.
 * This middleware serves the ReDoc documentation at the `/redoc` endpoint.
 *
 * @param app - The Express application instance.
 */
export const setupReDoc = (app: Express) => {
	app.get('/redoc', (req, res) => {
		res.sendFile(path.join(__dirname, '../../redoc.html'))
	})
}
