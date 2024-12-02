import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { isUser } from '../modules/auth'
import {
	createUserSymptomLog,
	getUserSymptomLogs,
	getUserSymptomLogById,
	updateSymptomLog,
	deleteUserSymptomLog,
} from '../handlers/userSymptomLog'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: UserSymptomLog
 *   description: User symptom log management endpoints
 */

/**
 * @swagger
 * /user-symptom-log:
 *   post:
 *     summary: Log a symptom for the user
 *     tags: [UserSymptomLog]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symptoms:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     severity:
 *                       type: integer
 *                       minimum: 1
 *                       maximum: 10
 *                     symptomStart:
 *                       type: string
 *                       format: date
 *                     symptomEnd:
 *                       type: string
 *                       format: date
 *                     description:
 *                       type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   countryCode:
 *                     type: string
 *     responses:
 *       201:
 *         description: Symptom log created successfully
 *       400:
 *         description: Bad request
 */
router.post(
	'/user-symptom-log',
	isUser,
	body('symptoms').custom((symptoms) => {
		if (!Array.isArray(symptoms) || symptoms.length === 0) {
			throw new Error('At least one symptom is required')
		}
		return true
	}),
	body('symptoms.*.id').isString(),
	body('symptoms.*.severity').isInt({ min: 1, max: 10 }).optional(),
	body('symptoms.*.symptomStart').isISO8601().optional(), // YYYY-MM-DD
	body('symptoms.*.symptomEnd').isISO8601().optional(), // YYYY-MM-DD
	body('symptoms.*.description').isString().optional(),
	body('location.city').isString(),
	body('location.state').isString().optional(),
	body('location.countryCode').isString(),
	handleInputErrors,
	createUserSymptomLog
)

/**
 * @swagger
 * /user-symptom-log:
 *   get:
 *     summary: Get all the symptoms logged by the user
 *     tags: [UserSymptomLog]
 *     security:
 *       - bearerAuth: []
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
 *                   symptoms:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         severity:
 *                           type: integer
 *                           minimum: 1
 *                           maximum: 10
 *                         symptomStart:
 *                           type: string
 *                           format: date
 *                         symptomEnd:
 *                           type: string
 *                           format: date
 *                         description:
 *                           type: string
 *                   location:
 *                     type: object
 *                     properties:
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       countryCode:
 *                         type: string
 */
router.get('/user-symptom-log', isUser, getUserSymptomLogs)

/**
 * @swagger
 * /user-symptom-log/{id}:
 *   get:
 *     summary: Get a specific symptom logged by the user
 *     tags: [UserSymptomLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The symptom log ID
 *     responses:
 *       200:
 *         description: Symptom log details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 symptoms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       severity:
 *                         type: integer
 *                         minimum: 1
 *                         maximum: 10
 *                       symptomStart:
 *                         type: string
 *                         format: date
 *                       symptomEnd:
 *                         type: string
 *                         format: date
 *                       description:
 *                         type: string
 *                 location:
 *                   type: object
 *                   properties:
 *                     city:
 *                       type: string
 *                     state:
 *                       type: string
 *                     countryCode:
 *                       type: string
 *       404:
 *         description: Symptom log not found
 */
router.get('/user-symptom-log/:id', isUser, getUserSymptomLogById)

/**
 * @swagger
 * /user-symptom-log/{logId}:
 *   put:
 *     summary: Update a specific symptom logged by the user
 *     tags: [UserSymptomLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: string
 *         description: The symptom log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symptoms:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     severity:
 *                       type: integer
 *                       minimum: 1
 *                       maximum: 10
 *                     symptomStart:
 *                       type: string
 *                       format: date
 *                     symptomEnd:
 *                       type: string
 *                       format: date
 *                     description:
 *                       type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   countryCode:
 *                     type: string
 *     responses:
 *       200:
 *         description: Symptom log updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Symptom log not found
 */
router.put(
	'/user-symptom-log/:logId',
	isUser,
	body('symptoms').custom((symptoms) => {
		if (!Array.isArray(symptoms) || symptoms.length === 0) {
			throw new Error('At least one symptom is required')
		}
		return true
	}),
	body('symptoms.*.id').isString(),
	body('symptoms.*.severity').isInt({ min: 1, max: 10 }).optional(),
	body('symptoms.*.symptomStart').isISO8601().optional(), // YYYY-MM-DD
	body('symptoms.*.symptomEnd').isISO8601().optional(), // YYYY-MM-DD
	body('symptoms.*.description').isString().optional(),
	body('location').isObject().optional(),
	body('location.city').if(body('location').exists()).isString().optional(),
	body('location.state').if(body('location').exists()).isString().optional(),
	body('location.countryCode')
		.if(body('location').exists())
		.isString()
		.optional(),
	handleInputErrors,
	updateSymptomLog
)

/**
 * @swagger
 * /user-symptom-log/{logId}:
 *   delete:
 *     summary: Delete a specific symptom logged by the user
 *     tags: [UserSymptomLog]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: string
 *         description: The symptom log ID
 *     responses:
 *       200:
 *         description: Symptom log deleted successfully
 *       404:
 *         description: Symptom log not found
 */
router.delete('/user-symptom-log/:logId', isUser, deleteUserSymptomLog)

export default router
