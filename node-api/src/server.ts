import express from 'express'
import morgan from 'morgan'
import { protect } from './modules/auth'
import authRouter from './routes/auth'
import symptomRouter from './routes/symptom'
import userSymptomLogRouter from './routes/userSymptomLog'
import countryRouter from './routes/country'

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
app.use('/api', protect, symptomRouter, userSymptomLogRouter, countryRouter)

export default app
