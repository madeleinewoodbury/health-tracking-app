import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { isUser } from '../modules/auth'
import { createUserSymptomLog } from '../handlers/userSymptomLog'

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
	// body('symptoms').isArray().notEmpty(),
	body('symptoms').custom((symptoms) => {
		if (!Array.isArray(symptoms) || symptoms.length === 0) {
			throw new Error('At least one symptom is required')
		}
		return true
	}),
	body('symptoms.*.id').isString(),
	body('symptoms.*.severity').isInt({ min: 1, max: 10 }),
	body('symptoms.*.startDate').isISO8601(), // YYYY-MM-DD
	body('symptoms.*.endDate').isISO8601().optional(), // YYYY-MM-DD
	body('symptoms.*.description').isString().optional(),
	body('location.city').isString(),
	body('location.state').isString().optional(),
	body('location.countryCode').isString(),
	handleInputErrors,
	createUserSymptomLog
)

export default router
