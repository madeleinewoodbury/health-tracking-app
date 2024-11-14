import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { LoginFormData } from '../types/auth'
import FormInput from '../components/forms/FormInput'
import Button from '../layout/Button'

const LoginPage = () => {
	const { login, isAuthenticated } = useAuth()
	const navigate = useNavigate()

	const [formData, setFormData] = useState<LoginFormData>({
		identifier: '',
		password: '',
	})

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated, navigate])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		login(formData)
	}

	// Handle change for each field
	const handleChange =
		<T extends keyof LoginFormData>(field: T) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setFormData({ ...formData, [field]: value })
		}

	return (
		<div className='flex flex-col items-center w-full max-w-lg mx-auto bg-neutral-800 rounded-lg shadow-md p-8'>
			<h1 className='text-white text-3xl font-semibold mb-4'>Login</h1>
			<form onSubmit={handleSubmit} className='w-full space-y-6'>
				<FormInput
					label='Username or Email'
					type='text'
					value={formData.identifier}
					onChange={handleChange('identifier')}
				/>
				<FormInput
					label='Password'
					type='password'
					value={formData.password}
					onChange={handleChange('password')}
				/>
				<Button type='submit' fullWidth>
					Login
				</Button>
				<p className='text-white text-md'>
					Don't have an account?{' '}
					<Link className='text-blue-400' to='/register'>
						Sign Up here
					</Link>
				</p>
			</form>
		</div>
	)
}
export default LoginPage
