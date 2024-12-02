import { Router } from 'express'
import { isAdmin } from '../modules/auth'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import {
	createCountry,
	updateCountry,
	getCountries,
	getCountry,
	deleteCountry,
} from '../handlers/country'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Country
 *   description: Country management endpoints
 */

/**
 * @swagger
 * /country:
 *   post:
 *     summary: Create a new country
 *     tags: [Country]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               alpha2:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 2
 *               active:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Country created successfully
 *       400:
 *         description: Bad request
 */
router.post(
	'/country',
	isAdmin,
	body('name').isString(),
	body('alpha2').isString().trim().isLength({ min: 2, max: 2 }),
	body('active').isBoolean().optional(),
	handleInputErrors,
	createCountry
)

/**
 * @swagger
 * /country/{id}:
 *   put:
 *     summary: Update an existing country
 *     tags: [Country]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               alpha2:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 2
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Country updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Country not found
 */
router.put(
	'/country/:id',
	isAdmin,
	body('name').isString().optional(),
	body('alpha2')
		.isString()
		.trim()
		.isLength({ min: 2, max: 2 })
		.toUpperCase()
		.optional(),
	body('active').isBoolean().optional(),
	handleInputErrors,
	updateCountry
)

/**
 * @swagger
 * /country:
 *   get:
 *     summary: Get all countries
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   alpha2:
 *                     type: string
 *                   active:
 *                     type: boolean
 */
router.get('/country', getCountries)

/**
 * @swagger
 * /country/{id}:
 *   get:
 *     summary: Get a country by ID
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country ID
 *     responses:
 *       200:
 *         description: Country details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 alpha2:
 *                   type: string
 *                 active:
 *                   type: boolean
 *       404:
 *         description: Country not found
 */
router.get('/country/:id', getCountry)

/**
 * @swagger
 * /country/{id}:
 *   delete:
 *     summary: Delete a country by ID
 *     tags: [Country]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The country ID
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *       404:
 *         description: Country not found
 */
router.delete('/country/:id', isAdmin, deleteCountry)

export default router
