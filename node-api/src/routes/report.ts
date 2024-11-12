import { Router } from 'express'
import { query } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import { getSymptomLogs } from '../handlers/report'

const router = Router()

/*
 * GET /api/report/user-symptom-log
 * Access: Admin or Provider
 * Query: {
 *   limit?: number,
 *   offset?:
 *   number, sortBy?: 'date' | 'city' | 'country' | 'age' | 'gender',
 *   order?: 'asc' | 'desc'
 * }
 * Description: Get all user symptom logs with the given limit, offset, sortBy, and order
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
