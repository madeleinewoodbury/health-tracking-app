import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCountry } from '../../hooks/country'
import { useSymptomLog } from '../../hooks/symptomLog'
import { useAuth } from '../../hooks/auth'
import FormInput from '../../components/forms/FormInput'
import FormSelect from '../../components/forms/FormSelect'
import Button from '../../layout/Button'
import SymptomForm from '../../components/forms/SymptomForm'

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
		fetchCountries()
		fetchSymptoms()

		// eslint-disable-next-line
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		// Submit form data to the server
		if (formData.symptoms.length === 0) {
			alert('At least one symptom is required')
			return
		}
		const success = await createSymptomLog(formData)
		if (success) {
			navigate('/')
		}
	}

	const handleAddSymptom = (symptom) => {
		setFormData({ ...formData, symptoms: [...formData.symptoms, symptom] })
		setShowSymptomForm(false)
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
					label='Nationality'
					value={formData.country}
					onChange={(e) =>
						setFormData({ ...formData, country: e.target.value })
					}
					options={countries.map((country) => ({
						value: country.alpha2,
						label: country.name,
					}))}
				/>
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
