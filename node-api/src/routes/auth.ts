import { Router } from 'express'
import { body, validationResult } from 'express-validator'

const router = Router()

router.post(
	'/register',
	body('username').isString(),
	body('email').isEmail(),
	body('password').isString().isLength({ min: 8 }),
	body('firstName').isString(),
	body('lastName').isString(),
	body('dob').isISO8601(), // Format: YYYY-MM-DD
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		res.send('Register')
	}
)

export default router
