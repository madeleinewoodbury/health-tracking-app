import { Router } from 'express'
import { isAdmin } from '../modules/auth'
import { body } from 'express-validator'
import { handleInputErrors } from '../modules/middleware'
import {
	createCountry,
	updateCountry,
	getCountries,
	getCountry,
	deleteCountry,
} from '../handlers/country'

const router = Router()

/*
 * POST /country
 * Access: Admin
 * Body: { name: string, alpha2: string, active?: boolean }
 * Description: Create a new country with the given name, alpha2 code, and optional active status
 */
router.post(
	'/country',
	isAdmin,
	body('name').isString(),
	body('alpha2').isString().trim().isLength({ min: 2, max: 2 }),
	body('active').isBoolean().optional(),
	handleInputErrors,
	createCountry
)

/*
 * PUT /country/:id
 * Access: Admin
 * Body: { name?: string, alpha2?: string, active?: boolean }
 * Description: Update the country with the given id with the given name, alpha2 code, and active status
 */
router.put(
	'/country/:id',
	isAdmin,
	body('name').isString().optional(),
	body('alpha2')
		.isString()
		.trim()
		.isLength({ min: 2, max: 2 })
		.toUpperCase()
		.optional(),
	body('active').isBoolean().optional(),
	handleInputErrors,
	updateCountry
)

/*
 * GET /country
 * Access: Admin, Provider, User
 * Description: Get all countries
 */
router.get('/country', getCountries)

/*
 * GET /country/:id
 * Access: Admin, Provider, User
 * Description: Get a country by its id
 */
router.get('/country/:id', getCountry)

router.delete('/country/:id', isAdmin, deleteCountry)

export default router
