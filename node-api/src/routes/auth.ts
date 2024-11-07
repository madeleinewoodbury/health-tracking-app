import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { createUser, signIn } from '../handlers/auth'

const router = Router()

/**
 * POST /auth/register
 * Request body: { username, email, password, firstName, lastName, dob }
 * Registers a new user in the database. Returns a JWT token.
 */
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

/**
 * POST /auth/login
 * Request body: { identifier, password }
 * Authenticates a user using their username or email and password. Returns a JWT token.
 */
router.post(
	'/login',
	body('identifier').isString(), // Can be either username or email
	body('password').isString(),
	handleInputErrors,
	signIn
)

export default router
