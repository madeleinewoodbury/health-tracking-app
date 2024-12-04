import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCountry } from '../../hooks/country'
import { useSymptomLog } from '../../hooks/symptomLog'
import { useAuth } from '../../hooks/auth'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import Button from '../../layout/Button'
import SymptomForm from '../../components/forms/SymptomForm'

/**
 * The AddLogPage component is a form that allows users to add a new symptom log.
 * The form includes fields for the user to enter their location and select symptoms.
 * Will redirect to the home page after successfully submitting the form.
 * @returns {JSX.Element} The AddLogPage component
 */
const AddLogPage = () => {
	const navigate = useNavigate()
	const { countries, fetchCountries } = useCountry()
	const { symptoms, fetchSymptoms, createSymptomLog } = useSymptomLog()
	const { user } = useAuth()
	const [formData, setFormData] = useState({
		city: '',
		state: '',
		country: user ? user.country.alpha2 : '',
		symptoms: [],
	})
	const [showSymptomForm, setShowSymptomForm] = useState(false)

	useEffect(() => {
		// Fetch countries and symptoms when the component mounts
		fetchCountries()
		fetchSymptoms()

		// eslint-disable-next-line
	}, [])

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault()
		// Submit form data to the server
		if (formData.symptoms.length === 0) {
			alert('At least one symptom is required')
			return
		}

		const success = await createSymptomLog(formData)
		// Redirect to the home page if the form was successfully submitted
		if (success) {
			navigate('/')
		}
	}

	// Handle adding a symptom to the form data
	const handleAddSymptom = (symptom) => {
		setFormData({ ...formData, symptoms: [...formData.symptoms, symptom] })
		setShowSymptomForm(false)
	}

	// Handle removing a symptom from the form data
	const handleRemoveSymptom = (e, symptom) => {
		e.preventDefault()
		console.log(symptom)
		setFormData({
			...formData,
			symptoms: formData.symptoms.filter((s) => s.id !== symptom.id),
		})
	}

	return (
		<div className='lex flex-col items-center w-full max-w-xl mx-auto bg-neutral-800 rounded-lg shadow-md p-8'>
			<h1 className='text-white text-3xl font-semibold mb-6 text-center'>
				Add Symptom Log
			</h1>
			<form onSubmit={handleSubmit}>
				<h3 className='text-white text-xl mb-2'>Enter Location</h3>
				<div className='flex gap-4 mb-2'>
					<div className='w-3/5'>
						<FormInput
							label='City'
							type='text'
							name='city'
							value={formData.city}
							onChange={(e) =>
								setFormData({ ...formData, city: e.target.value })
							}
							required
						/>
					</div>
					<div className='w-2/5'>
						<FormInput
							label='State'
							type='text'
							name='state'
							value={formData.state}
							onChange={(e) =>
								setFormData({ ...formData, state: e.target.value })
							}
						/>
					</div>
				</div>
				<FormSelect
					label='Country'
					value={formData.country}
					onChange={(e) =>
						setFormData({ ...formData, country: e.target.value })
					}
					options={countries.map((country) => ({
						value: country.alpha2,
						label: country.name,
					}))}
				/>
				{symptoms.length > 0 && (
					<div className='mt-6'>
						<h3 className='text-white text-xl mb-2'>Symptoms</h3>
						<ul className='grid grid-cols-1 gap-2'>
							{formData.symptoms.map((symptom) => (
								<li
									key={symptom.id}
									className='bg-neutral-700 py-2 px-4 rounded-md text-white flex justify-between items-center'>
									<span>{symptom.name}</span>
									<Button
										variant='danger'
										onClick={(e) => handleRemoveSymptom(e, symptom)}>
										Remove
									</Button>
								</li>
							))}
						</ul>
					</div>
				)}
				{showSymptomForm ? (
					<SymptomForm symptoms={symptoms} onAddSymptom={handleAddSymptom} />
				) : (
					<div className='flex gap-4 mt-6'>
						<Button
							type='button'
							onClick={() => setShowSymptomForm(true)}
							variant='primary'>
							Add Symptoms
						</Button>
						<Button type='submit' variant='success'>
							Submit Log
						</Button>
					</div>
				)}
			</form>
		</div>
	)
}

export default AddLogPage
