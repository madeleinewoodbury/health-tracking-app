import { Router } from 'express'
import { query } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import {
	getUserActivtyPerDay,
	getSymptomCountsByLocation,
	getSymptomPatterns,
} from '../handlers/admin'

const router = Router()

/*
 * GET /admin/activity
 * Access: Admin
 * Description: Returns the number of unique user per day.
 */
router.get(
	'/activity',
	[query('startDate').isISO8601(), query('endDate').isISO8601()],
	handleInputErrors,
	getUserActivtyPerDay
)

/*
 * GET /admin/geographic
 * Access: Admin
 * Query: { country: string, city: string, state?: string }
 * Description: Returns the symptom counts for the given location.
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

/*
 * GET /admin/symptoms
 * Access: Admin
 * Query: { symptom: string }
 * Description: Returns the patterns of the given symptom.
 */
router.get(
	'/symptoms',
	query('symptom').isString(),
	handleInputErrors,
	getSymptomPatterns
)

export default router
