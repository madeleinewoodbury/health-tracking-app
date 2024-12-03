import { useState } from 'react'
import FormInput from './FormInput'
import FormTextArea from './FormTextArea'
import Button from '../../layout/Button'

/**
 * This component is used to add a symptom to the user's symptoms list.
 * @param {Array} props.symptoms - The list of symptoms.
 * @param {Function} props.onAddSymptom - The function to add a symptom.
 * @returns
 */
const SymptomForm = ({ symptoms, onAddSymptom }) => {
	const [inputValue, setInputValue] = useState('')
	const [filteredSymptoms, setFilteredSymptoms] = useState(symptoms)
	const [selectedSymptom, setSelectedSymptom] = useState(null)
	const [formData, setFormData] = useState({
		severity: 0,
		symptomStart: '',
		symptomEnd: '',
		description: '',
	})

	// Handle input change and filter symptoms based on the input value
	const handleInputChange = (e) => {
		const value = e.target.value
		setInputValue(value)
		setFilteredSymptoms(
			symptoms.filter((symptom) =>
				symptom.name.toLowerCase().includes(value.toLowerCase())
			)
		)
	}

	// Handle symptom select and set the selected symptom
	const handleSymptomSelect = (symptom) => {
		setSelectedSymptom(symptom)
		setInputValue('')
		setFilteredSymptoms(symptoms)
	}

	// Add symptom to the user's symptoms list
	const handleAddSymptoms = () => {
		if (!selectedSymptom) return

		// Create a symptom object
		const symptom = {
			id: selectedSymptom.id,
			name: selectedSymptom.name,
			severity: formData.severity === 0 ? null : formData.severity,
			description:
				formData.description.length === 0 ? null : formData.description,
			symptomStart:
				formData.symptomStart.length === 0 ? null : formData.symptomStart,
			symptomEnd: formData.symptomEnd.length === 0 ? null : formData.symptomEnd,
		}
		onAddSymptom(symptom)
	}

	return (
		<div className='symptom-form'>
			<h3 className='text-white text-lg font-bold mb-2 mt-6'>Add Symptom</h3>
			<div className='mb-4'>
				<FormInput
					label='Search Symptoms'
					type='text'
					value={inputValue}
					onChange={handleInputChange}
				/>
				{inputValue && (
					<ul className='filtered-symptoms-list bg-white border border-gray-300 rounded-md mt-2'>
						{filteredSymptoms.map((symptom) => (
							<li
								key={symptom.id}
								className='p-2 cursor-pointer hover:bg-gray-200'
								onClick={() => handleSymptomSelect(symptom)}>
								{symptom.name}
							</li>
						))}
					</ul>
				)}
			</div>

			{selectedSymptom && (
				<div className='selected-symptom bg-neutral-100 py-4 px-6 rounded mb-4'>
					<h4 className='text-lg font-bold mb-2'>{selectedSymptom.name}</h4>
					<div className='flex flex-col gap-2'>
						<FormInput
							label='Severity'
							type='number'
							value={formData.severity.toString()}
							onChange={(e) =>
								setFormData({ ...formData, severity: parseInt(e.target.value) })
							}
							textDark={true}
						/>
						<div className='flex gap-4'>
							<div className='w-1/2'>
								<FormInput
									label='Start Date'
									type='date'
									value={formData.symptomStart}
									onChange={(e) =>
										setFormData({ ...formData, symptomStart: e.target.value })
									}
									textDark={true}
								/>
							</div>
							<div className='w-1/2'>
								<FormInput
									label='End Date'
									type='date'
									value={formData.symptomEnd}
									onChange={(e) =>
										setFormData({ ...formData, symptomEnd: e.target.value })
									}
									textDark={true}
								/>
							</div>
						</div>
						<FormTextArea
							label='Description'
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							textDark={true}
						/>
					</div>
				</div>
			)}

			<Button type='button' onClick={handleAddSymptoms} variant='primary'>
				Add Symptom
			</Button>
		</div>
	)
}

export default SymptomForm
