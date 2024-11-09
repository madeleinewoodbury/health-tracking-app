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

/*
 * POST /user-symptom-log
 * Access: User
 * Body:
 * Description: Log a symptom for the user
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

/*
 * GET /user-symptom-log
 * Access: User
 * Description: Get all the symptoms logged by the user
 */
router.get('/user-symptom-log', isUser, getUserSymptomLogs)

/*
 * GET /user-symptom-log/:id
 * Access: User
 * Description: Get a specific symptom logged by the user
 */
router.get('/user-symptom-log/:id', isUser, getUserSymptomLogById)

/*
 * PUT /user-symptom-log/:logId
 * Access: User
 * Description: Update a specific symptom logged by the user
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

/*
 * DELETE /user-symptom-log/:logId
 * Access: User
 * Description: Delete a specific symptom logged by the user
 */
router.delete('/user-symptom-log/:logId', isUser, deleteUserSymptomLog)

export default router
