import express from 'express'
import morgan from 'morgan'
import auth from './routes/auth'

const app = express()

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send('API is running')
})

// Routes
app.use('/auth', auth)

export default app
