import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

const HomePage = () => {
	const { isAuthenticated } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login')
		}
	}, [isAuthenticated, navigate])

	return (
		<div>
			<h1 className='text-white'>Home Page</h1>
		</div>
	)
}

export default HomePage
