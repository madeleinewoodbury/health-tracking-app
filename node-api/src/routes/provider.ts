import { Router } from 'express'
import { isProvider } from '../modules/auth'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import {
	createProvider,
	getProvider,
	getProviderById,
	updateProvider,
	deletedProvider,
} from '../handlers/provider'

const router = Router()

/*
 * POST /provider
 * Access: Provider
 * Body: { firstName: string, lastName: string, specialty: string, title?: string, location: { city: string, state?: string, countryCode: string } }
 * Description: Create a new provider with the given first name, last name, specialty, title, and location
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

/*
 * GET /provider
 * Access: Provider, User, Admin
 * Description: Get all providers
 */
router.get('/provider', getProvider)

/*
 * GET /provider/:id
 * Access: Provider, User, Admin
 * Description: Get the provider with the given id
 */
router.get('/provider/:id', getProviderById)

/*
 * PUT /provider/:id
 * Access: Provider
 * Body: { specialization?: string, title?: string, location?: { city?: string, state?: string, countryCode: string } }
 * Description: Update the provider with the given id with the given specialization, title, and location
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

/*
 * DELETE /provider/:id
 * Access: Provider
 * Description: Delete the provider with the given id
 */
router.delete('/provider/:id', isProvider, deletedProvider)

export default router
