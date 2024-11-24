import { Router } from 'express'
import { getUserActivtyPerDay } from '../handlers/admin'

const router = Router()

router.get('/activity', getUserActivtyPerDay)

export default router
