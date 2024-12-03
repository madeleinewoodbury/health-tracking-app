import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'
import { useProvider } from '../../hooks/provider'
import { useCountry } from '../../hooks/country'
import { ProviderProfileFormData } from '../../types/provider'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import Button from '../../layout/Button'

const AddProviderProfile = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const { createProviderProfile } = useProvider()
	const { countries, fetchCountries } = useCountry()
	const [formData, setFormData] = useState<ProviderProfileFormData>({
		firstName: '',
		lastName: '',
		specialty: '',
		title: '',
		location: {
			city: '',
			state: '',
			countryCode: user ? user.country.alpha2 : '',
		},
	})

	useEffect(() => {
		fetchCountries()
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const success = createProviderProfile(formData)
		if (success) {
			navigate('/')
		}
	}

	// Handle change for each field
	const handleChange =
		<T extends keyof ProviderProfileFormData>(field: T) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setFormData({ ...formData, [field]: e.target.value })
		}

	const handleLocationChange =
		(field: 'city' | 'state' | 'countryCode') =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setFormData({
				...formData,
				location: {
					...formData.location,
					[field]: e.target.value,
				},
			})
		}

	return (
		<div className='flex flex-col items-center w-full max-w-lg mx-auto bg-neutral-800 rounded-lg shadow-md p-8'>
			<h1 className='text-white text-3xl font-semibold mb-4'>Register</h1>
			<form onSubmit={handleSubmit} className='w-full space-y-6'>
				<FormInput
					label='First Name'
					type='text'
					value={formData.firstName}
					required={true}
					onChange={handleChange('firstName')}
				/>
				<FormInput
					label='Last Name'
					type='text'
					required={true}
					value={formData.lastName}
					onChange={handleChange('lastName')}
				/>
				<FormInput
					label='Specialty'
					type='text'
					required={true}
					value={formData.specialty}
					onChange={handleChange('specialty')}
				/>
				<FormInput
					label='Title'
					type='text'
					required={true}
					value={formData.title}
					onChange={handleChange('title')}
				/>
				<FormSelect
					label='Country'
					value={formData.location.countryCode}
					onChange={handleLocationChange('countryCode')}
					options={countries.map((country) => ({
						value: country.alpha2,
						label: country.name,
					}))}
				/>
				<FormInput
					label='City'
					type='text'
					value={formData.location.city}
					onChange={handleLocationChange('city')}
				/>
				<FormInput
					label='State'
					type='text'
					value={formData.location.state}
					onChange={handleLocationChange('state')}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</div>
	)
}
export default AddProviderProfile
