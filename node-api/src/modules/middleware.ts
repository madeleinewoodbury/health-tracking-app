import { validationResult } from 'express-validator'

export const handleInputErrors = (req, res, next) => {
	const errors = validationResult(req)
	// Check if there are any errors
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	next()
}
