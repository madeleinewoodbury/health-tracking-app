import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'

const router = Router()

/*
 * POST /user-symptom-log
 * Access: User
 * Body:
 * Description: Log a symptom for the user
 */
router.post(
	'/user-symptom-log',
	body('symptoms').isArray(),
	body('symptoms.*.name').isString(),
	body('symptoms.*.severity').isInt(),
	body('symptoms.*.startDate').isISO8601(), // YYYY-MM-DD
	body('symptoms.*.endDate').isISO8601().optional(), // YYYY-MM-DD
	body('symptoms.*.description').isString().optional(),
	body('location.city').isString(),
	body('location.state').isString(),
	body('location.zipCode').isString(),
	body('location.country').isString(),
	handleInputErrors,

	(req, res) => {
		// Implement the handler
		res.json({ message: 'Not implemented' })
	}
)

export default router
