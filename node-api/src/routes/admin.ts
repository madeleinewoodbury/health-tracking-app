import { Router } from 'express'
import { getUserActivtyPerDay, getGeographicTrends } from '../handlers/admin'

const router = Router()

router.get('/activity', getUserActivtyPerDay)

router.get('/geographic', getGeographicTrends)

export default router
