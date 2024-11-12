import express from 'express'
import morgan from 'morgan'
import { protect, isAdminOrProvider } from './modules/auth'
import authRouter from './routes/auth'
import symptomRouter from './routes/symptom'
import userSymptomLogRouter from './routes/userSymptomLog'
import countryRouter from './routes/country'
import providerRouter from './routes/provider'
import reportRouter from './routes/report'

const app = express()

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send('API is running')
})

// Routes
app.use('/auth', authRouter)
app.use(
	'/api',
	protect,
	symptomRouter,
	userSymptomLogRouter,
	countryRouter,
	providerRouter
)
app.use('/api/report', isAdminOrProvider, reportRouter)

export default app
