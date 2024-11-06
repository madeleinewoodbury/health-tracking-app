import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { createUser } from '../handlers/auth'

const router = Router()

router.post(
	'/register',
	body('username').isString(),
	body('email').isEmail(),
	body('password').isString().isLength({ min: 8 }),
	body('firstName').isString(),
	body('lastName').isString(),
	body('dob').isISO8601(), // Format: YYYY-MM-DD
	handleInputErrors,
	createUser
)

export default router
