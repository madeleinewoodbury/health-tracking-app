import { Router } from 'express'
import { getActivty } from '../handlers/admin'

const router = Router()

router.get('/activity', getActivty)

export default router
