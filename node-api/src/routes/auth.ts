import { Router } from 'express'
import { body } from 'express-validator'
import { protect } from '../modules/auth'
import { handleInputErrors } from '../modules/middleware'
import { createUser, signIn, getUser } from '../handlers/auth'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request
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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticates a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Can be either username or email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post(
	'/login',
	body('identifier').isString(), // Can be either username or email
	body('password').isString(),
	handleInputErrors,
	signIn
)

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Returns the user information
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 gender:
 *                   type: string
 *                 nationality:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/user', protect, getUser)

export default router
