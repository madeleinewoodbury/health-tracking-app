import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCountry } from '../../hooks/country'
import { useSymptomLog } from '../../hooks/symptomLog'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import Button from '../../layout/Button'
import SymptomForm from '../../components/forms/SymptomForm'

/**
 * The EditLogPage component allows users to edit an existing symptom log entry.
 * Will redirect to the log page if the log is successfully updated.
 * @returns {JSX.Element} The EditLogPage component
 */
const EditLogPage = () => {
	const navigate = useNavigate()
	const { countries, fetchCountries } = useCountry()
	const { symptoms, fetchSymptoms, updateSymptomLog, symptomLog } =
		useSymptomLog()
	// Initialize the form data with the symptom log data
	const [formData, setFormData] = useState({
		city: symptomLog ? symptomLog.location.city : '',
		state: symptomLog ? symptomLog.location.state || '' : '',
		country: symptomLog ? symptomLog.location.country : '',
		symptoms: symptomLog ? symptomLog.symptoms : [],
	})
	const [showSymptomForm, setShowSymptomForm] = useState(false)

	useEffect(() => {
		// Fetch countries and symptoms when the component mounts
		fetchCountries()
		fetchSymptoms()

		if (countries.length > 0) {
			// Set the country code based on the country name
			const country = countries.find(
				(country) => country.name === formData.country
			)
			if (country) {
				setFormData({ ...formData, country: country.alpha2 })
			} else {
				// Set the country code to the first country in the list if not found
				setFormData({ ...formData, country: countries[0].alpha2 })
			}
		}

		// eslint-disable-next-line
	}, [countries.length])

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault()
		// Submit form data to the server
		if (formData.symptoms.length === 0) {
			alert('At least one symptom is required')
			return
		}

		// Update the symptom log with the new data
		if (symptomLog && symptomLog.id) {
			const success = await updateSymptomLog(symptomLog?.id, formData)
			if (success) {
				// Redirect to the log page if the log is successfully updated
				navigate(`/log/${symptomLog.id}`)
			}
		}
	}

	// Add a symptom to the form data
	const handleAddSymptom = (symptom) => {
		setFormData({ ...formData, symptoms: [...formData.symptoms, symptom] })
		setShowSymptomForm(false)
	}

	// Remove a symptom from the form data
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
				Edit Symptom Log
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
							Update Log
						</Button>
					</div>
				)}
			</form>
		</div>
	)
}

export default EditLogPage
