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

router.get('/country', getCountries)

router.get('/country/:id', getCountry)

router.post(
	'/country',
	isAdmin,
	body('name').isString(),
	body('alpha2').isString().trim().isLength({ min: 2, max: 2 }),
	body('active').isBoolean().optional(),
	handleInputErrors,
	createCountry
)

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

router.delete('/country/:id', isAdmin, deleteCountry)

export default router
