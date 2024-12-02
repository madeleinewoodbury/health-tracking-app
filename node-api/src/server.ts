import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { protect, isAdminOrProvider, isAdmin } from './modules/auth'
import { logger, setupReDoc } from './modules/middleware'
import { setupSwagger } from './modules/swagger'
import authRouter from './routes/auth'
import symptomRouter from './routes/symptom'
import userSymptomLogRouter from './routes/userSymptomLog'
import countryRouter from './routes/country'
import providerRouter from './routes/provider'
import reportRouter from './routes/report'
import adminRouter from './routes/admin'

const app = express()

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send('API is running')
})

// Serve swagger.json for ReDoc
app.use(
	'/swagger.json',
	express.static(path.resolve(__dirname, '../swagger.json'))
)

// Routes
app.use('/auth', authRouter)
app.use('/admin', protect, isAdmin, adminRouter)
app.use('/api', countryRouter)
app.use(
	'/api',
	protect,
	logger,
	symptomRouter,
	userSymptomLogRouter,
	providerRouter
)
app.use('/api/report', isAdminOrProvider, logger, reportRouter)

// Setup Swagger and ReDoc
setupSwagger(app)
setupReDoc(app)

export default app
