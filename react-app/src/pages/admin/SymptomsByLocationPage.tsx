import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../hooks/admin'
import { useCountry } from '../../hooks/country'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import Button from '../../layout/Button'
import BarChart from '../../components/charts/BarChart'

/**
 * The SymptomsByLocationPage component allows the admin to view the symptoms count by location.
 * The admin can select a country, city, and state to view the symptoms count.
 * @returns {JSX.Element} The SymptomsByLocationPage component
 */
const SymptomsByLocationPage = () => {
	const { loading, fetchSymptomsByLocation, symptomsByLocation } = useAdmin()
	const { countries, fetchCountries } = useCountry()
	const [country, setCountry] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		// Fetch countries on component mount
		if (countries.length === 0) {
			fetchCountries()
		} else {
			// Set default country to the United States
			countries
				.filter((country) => country.name === 'United States')
				.map((country) => setCountry(country.name))
		}
		// eslint-disable-next-line
	}, [countries])

	// Handle form submission for selecting a location
	const handleSubmit = (e) => {
		e.preventDefault()
		if (country === '' || city === '') return

		// Fetch symptoms by location
		fetchSymptomsByLocation(country, city, state)
	}

	return (
		<div className='container mx-auto'>
			<Button onClick={() => navigate('/')} variant='secondary'>
				Go Back
			</Button>
			<h1 className='text-2xl font-bold mt-2 mb-4 text-white text-center'>
				Symptoms by Location
			</h1>
			<form onSubmit={handleSubmit} className='flex space-x-4 justify-center'>
				<FormSelect
					label='Country'
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					options={countries.map((country) => ({
						value: country.name,
						label: country.name,
					}))}
				/>
				<FormInput
					label='City'
					type='text'
					value={city}
					onChange={(e) => setCity(e.target.value)}
					required={true}
				/>
				<FormInput
					label='State'
					type='text'
					value={state}
					onChange={(e) => setState(e.target.value)}
				/>
				<div className='flex items-end'>
					<Button type='submit'>Submit</Button>
				</div>
			</form>
			{loading && <p className='text-white text-center'>Loading...</p>}
			{symptomsByLocation && (
				<div className='mt-6 flex justify-center'>
					<BarChart data={symptomsByLocation} />
				</div>
			)}
		</div>
	)
}
export default SymptomsByLocationPage
