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

/**
 * @swagger
 * tags:
 *   name: Symptom
 *   description: Symptom management endpoints
 */

/**
 * @swagger
 * /symptom:
 *   post:
 *     summary: Create a new symptom
 *     tags: [Symptom]
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
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Symptom created successfully
 *       400:
 *         description: Bad request
 */
router.post(
	'/symptom',
	isAdminOrProvider,
	body('name').isString(),
	body('description').isString().optional(),
	handleInputErrors,
	createSymptom
)

/**
 * @swagger
 * /symptom/{id}:
 *   put:
 *     summary: Update an existing symptom
 *     tags: [Symptom]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The symptom ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Symptom updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Symptom not found
 */
router.put(
	'/symptom/:id',
	isAdminOrProvider,
	body('name').isString().optional(),
	body('description').isString().optional(),
	handleInputErrors,
	updateSymptom
)

/**
 * @swagger
 * /symptom:
 *   get:
 *     summary: Get all symptoms
 *     tags: [Symptom]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of symptoms
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
 *                   description:
 *                     type: string
 */
router.get('/symptom', getSymptoms)

/**
 * @swagger
 * /symptom/{id}:
 *   get:
 *     summary: Get a symptom by ID
 *     tags: [Symptom]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The symptom ID
 *     responses:
 *       200:
 *         description: Symptom details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Symptom not found
 */
router.get('/symptom/:id', getSymptomById)

/**
 * @swagger
 * /symptom/{id}:
 *   delete:
 *     summary: Delete a symptom by ID
 *     tags: [Symptom]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The symptom ID
 *     responses:
 *       200:
 *         description: Symptom deleted successfully
 *       404:
 *         description: Symptom not found
 */
router.delete('/symptom/:id', isAdminOrProvider, deleteSymptom)

export default router
