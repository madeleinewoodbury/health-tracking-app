import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/auth'
import { useCountry } from '../hooks/country'
import { RegisterFormData } from '../types/auth'
import FormInput from './Forms/FormInput'
import FormSelect from './Forms/FormSelect'

export const RegisterForm = () => {
	const { register } = useAuth()
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
		fetchCountries()
		// eslint-disable-next-line
	}, [])

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
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto mt-16 p-6 bg-neutral-800 rounded-lg shadow-md space-y-6'>
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
			<button
				type='submit'
				className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'>
				Register
			</button>
		</form>
	)
}
