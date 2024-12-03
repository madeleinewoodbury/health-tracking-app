import { Router } from 'express'
import { isProvider } from '../modules/auth'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import {
	createProvider,
	getProvider,
	getProviderById,
	getProviderByUserId,
	updateProvider,
	deletedProvider,
} from '../handlers/provider'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Provider
 *   description: Provider management endpoints
 */

/**
 * @swagger
 * /provider:
 *   post:
 *     summary: Create a new provider
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               specialty:
 *                 type: string
 *               title:
 *                 type: string
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
 *         description: Provider created successfully
 *       400:
 *         description: Bad request
 */
router.post(
	'/provider',
	isProvider,
	body('firstName').isString(),
	body('lastName').isString(),
	body('specialty').isString(),
	body('title').isString().optional(),
	body('location.city').isString(),
	body('location.state').isString().optional(),
	body('location.countryCode').isString(),
	handleInputErrors,
	createProvider
)

/**
 * @swagger
 * /provider:
 *   get:
 *     summary: Get all providers
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of providers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   specialty:
 *                     type: string
 *                   title:
 *                     type: string
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
router.get('/provider', getProvider)

/**
 * @swagger
 * /provider/user:
 *   get:
 *     summary: Get provider by user ID
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Provider details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 specialty:
 *                   type: string
 *                 title:
 *                   type: string
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
 *         description: Provider not found
 */
router.get('/provider/user', getProviderByUserId)

/**
 * @swagger
 * /provider/{id}:
 *   get:
 *     summary: Get a provider by ID
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The provider ID
 *     responses:
 *       200:
 *         description: Provider details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 specialty:
 *                   type: string
 *                 title:
 *                   type: string
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
 *         description: Provider not found
 */
router.get('/provider/:id', getProviderById)

/**
 * @swagger
 * /provider/{id}:
 *   put:
 *     summary: Update an existing provider
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The provider ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialization:
 *                 type: string
 *               title:
 *                 type: string
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
 *         description: Provider updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Provider not found
 */
router.put(
	'/provider/:id',
	isProvider,
	body('specialization').isString().optional(),
	body('title').isString().optional(),
	body('location').isObject().optional(),
	body('location.city').if(body('location').exists()).isString().optional(),
	body('location.state').if(body('location').exists()).isString().optional(),
	body('location.countryCode')
		.if(body('location').exists())
		.isString()
		.optional(),
	handleInputErrors,
	updateProvider
)

/**
 * @swagger
 * /provider/{id}:
 *   delete:
 *     summary: Delete a provider by ID
 *     tags: [Provider]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The provider ID
 *     responses:
 *       200:
 *         description: Provider deleted successfully
 *       404:
 *         description: Provider not found
 */
router.delete('/provider/:id', isProvider, deletedProvider)

export default router
