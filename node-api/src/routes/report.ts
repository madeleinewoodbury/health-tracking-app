import { Router } from 'express'
import { query } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { getSymptomLogs } from '../handlers/report'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Report
 *   description: Report management endpoints
 */

/**
 * @swagger
 * /api/report/user-symptom-log:
 *   get:
 *     summary: Get all user symptom logs
 *     tags: [Report]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         required: false
 *         description: The number of logs to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         required: false
 *         description: The number of logs to skip
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [date, city, country, age, gender]
 *         required: false
 *         description: The field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         required: false
 *         description: The order to sort by
 *     responses:
 *       200:
 *         description: A list of user symptom logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   symptom:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   gender:
 *                     type: string
 *       400:
 *         description: Bad request
 */
router.get(
	'/user-symptom-log',
	query('limit').isInt({ min: 1, max: 100 }).optional(),
	query('offset').isInt({ min: 0 }).optional(),
	query('sortBy').optional().isIn(['date', 'city', 'country', 'age', 'gender']),
	query('order').optional().isIn(['asc', 'desc']),
	handleInputErrors,
	getSymptomLogs
)

export default router
