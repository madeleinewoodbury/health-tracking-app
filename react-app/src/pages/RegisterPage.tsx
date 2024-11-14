import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { useCountry } from '../hooks/country'
import { RegisterFormData } from '../types/auth'
import FormInput from '../components/forms/FormInput'
import FormSelect from '../components/forms/FormSelect'
import Button from '../layout/Button'

const RegisterPage = () => {
	const { register, isAuthenticated } = useAuth()
	const navigate = useNavigate()
	const { countries, fetchCountries } = useCountry()
	const [passwordConfirmation, setPasswordConfirmation] = useState('')

	const [formData, setFormData] = useState<RegisterFormData>({
		username: '',
		email: '',
		password: '',
		age: 18,
		gender: 'FEMALE',
		nationality: '',
	})

	const genderOptions = [
		{ value: 'MALE', label: 'Male' },
		{ value: 'FEMALE', label: 'Female' },
		{ value: 'OTHER', label: 'Other' },
	]

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}

		fetchCountries()
		// eslint-disable-next-line
	}, [isAuthenticated, navigate])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (formData.password !== passwordConfirmation) {
			alert('Passwords do not match')
			return
		}

		register(formData)
	}

	// Handle change for each field
	const handleChange =
		<T extends keyof RegisterFormData>(field: T) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			const value =
				e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
			setFormData({ ...formData, [field]: value })
		}

	return (
		<div className='flex flex-col items-center w-full max-w-lg mx-auto bg-neutral-800 rounded-lg shadow-md p-8'>
			<h1 className='text-white text-3xl font-semibold mb-4'>Register</h1>
			<form onSubmit={handleSubmit} className='w-full space-y-6'>
				<FormInput
					label='Username'
					type='text'
					value={formData.username}
					onChange={handleChange('username')}
				/>
				<FormInput
					label='Email'
					type='email'
					value={formData.email}
					onChange={handleChange('email')}
				/>
				<FormInput
					label='Password'
					type='password'
					value={formData.password}
					onChange={handleChange('password')}
				/>
				<FormInput
					label='Confirm Password'
					type='password'
					value={passwordConfirmation}
					onChange={(e) => setPasswordConfirmation(e.target.value)}
				/>
				<FormInput
					label='Age'
					type='number'
					value={formData.age.toString()}
					onChange={handleChange('age')}
				/>
				<FormSelect
					label='Gender'
					value={formData.gender}
					onChange={handleChange('gender')}
					options={genderOptions}
				/>
				<FormSelect
					label='Nationality'
					value={formData.nationality}
					onChange={handleChange('nationality')}
					options={countries.map((country) => ({
						value: country.alpha2,
						label: country.name,
					}))}
				/>
				<Button type='submit'>Register</Button>
				<p className='text-white text-md'>
					Already have an account?{' '}
					<Link className='text-blue-400' to='/login'>
						Sign in here
					</Link>
				</p>
			</form>
		</div>
	)
}

export default RegisterPage
