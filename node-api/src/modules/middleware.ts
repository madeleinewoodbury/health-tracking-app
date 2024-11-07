import { validationResult } from 'express-validator'

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
