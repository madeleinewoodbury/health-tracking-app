import { Router } from 'express'
import { isAdminOrProvider } from '../modules/auth'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import {
	createSymptom,
	updateSymptom,
	getSymptoms,
	getSymptomById,
	deleteSymptom,
} from '../handlers/symptom'

const router = Router()

/*
 * POST /symptom
 * Access: Admin, Provider
 * Body: { name: string, description?: string }
 * Description: Create a new symptom with the given name and optional description
 */
router.post(
	'/symptom',
	isAdminOrProvider,
	body('name').isString(),
	body('description').isString().optional(),
	handleInputErrors,
	createSymptom
)

/*
 * PUT /symptom/:id
 * Access: Admin, Provider
 * Body: { name?: string, description?: string }
 * Description: Update the symptom with the given id with the given name and description
 */
router.put(
	'/symptom/:id',
	isAdminOrProvider,
	body('name').isString().optional(),
	body('description').isString().optional(),
	handleInputErrors,
	updateSymptom
)

/*
 * GET /symptom
 * Access: Admin, Provider, User
 * Description: Get all symptoms
 */
router.get('/symptom', getSymptoms)

/*
 * GET /symptom/:id
 * Access: Admin, Provider, User
 * Description: Get a symptom by its id
 */
router.get('/symptom/:id', getSymptomById)

/*
 * DELETE /symptom/:id
 * Access: Admin, Provider
 * Description: Delete a symptom by its id
 */
router.delete('/symptom/:id', isAdminOrProvider, deleteSymptom)

export default router
