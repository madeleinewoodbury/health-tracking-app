import { Router } from 'express'
import { body } from 'express-validator'
import { protect } from '../modules/auth'
import { handleInputErrors } from '../modules/middleware'
import { createUser, signIn, getUser } from '../handlers/auth'

const router = Router()

/*
 * POST /auth/register
 * Access: Public
 * Body: { username, email, password, age, gender, nationality }
 * Description: Registers a new user in the database. Returns a JWT token.
 */
router.post(
	'/register',
	body('username').isString(),
	body('email').isEmail(),
	body('password').isString().isLength({ min: 8 }),
	body('age').isInt(),
	body('gender').isIn(['MALE', 'FEMALE', 'OTHER']),
	body('nationality').isString(),
	handleInputErrors,
	createUser
)

/*
 * POST /auth/login
 * Access: Public
 * Body: { identifier, password }
 * Description: Authenticates a user using their username or email and password. Returns a JWT token.
 */
router.post(
	'/login',
	body('identifier').isString(), // Can be either username or email
	body('password').isString(),
	handleInputErrors,
	signIn
)

/*
 * GET /auth/user
 * Access: Private
 * Description: Returns the user information.
 */
router.get('/user', protect, getUser)

export default router
