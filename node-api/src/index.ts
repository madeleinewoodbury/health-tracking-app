import * as dotenv from 'dotenv'
dotenv.config()
import app from './server'

const PORT = process.env.PORT || 5200
const baseUrl =
	process.env.NODE_ENV === 'production'
		? process.env.PROD_URL
		: `http://localhost:${PORT}`

app.listen(PORT, () => {
	console.log(`Server is running on ${baseUrl}`)
})
