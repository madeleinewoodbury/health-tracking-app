import { Router } from 'express'
import { query } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import {
	getUserActivtyPerDay,
	getSymptomCountsByLocation,
	getSymptomPatterns,
} from '../handlers/admin'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management endpoints (only accessible by admins)
 */

/**
 * @swagger
 * /admin/activity:
 *   get:
 *     summary: Returns the number of unique users per day
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The start date for the activity log
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: The end date for the activity log
 *     responses:
 *       200:
 *         description: A list of unique users per day
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                   uniqueUsers:
 *                     type: integer
 *       400:
 *         description: Bad request
 */
router.get(
	'/activity',
	[query('startDate').isISO8601(), query('endDate').isISO8601()],
	handleInputErrors,
	getUserActivtyPerDay
)

/**
 * @swagger
 * /admin/geographic:
 *   get:
 *     summary: Returns the symptom counts for the given location
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         required: true
 *         description: The country name
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city name
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: The state name (optional)
 *     responses:
 *       200:
 *         description: Symptom counts for the given location
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symptoms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       symptom:
 *                         type: string
 *                       count:
 *                         type: integer
 *       400:
 *         description: Bad request
 */
router.get(
	'/geographic',
	[
		query('country').isString(),
		query('city').isString(),
		query('state').isString().optional(),
	],
	handleInputErrors,
	getSymptomCountsByLocation
)

/**
 * @swagger
 * /admin/symptoms:
 *   get:
 *     summary: Returns the patterns of the given symptom
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: symptom
 *         schema:
 *           type: string
 *         required: true
 *         description: The symptom name
 *     responses:
 *       200:
 *         description: Symptom patterns for the given symptom
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   count:
 *                     type: integer
 *       400:
 *         description: Bad request
 */
router.get(
	'/symptoms',
	query('symptom').isString(),
	handleInputErrors,
	getSymptomPatterns
)

export default router
