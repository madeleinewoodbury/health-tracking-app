import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../hooks/admin'
import { useSymptomLog } from '../../hooks/symptomLog'
import Button from '../../layout/Button'
import FormInput from '../../components/forms/FormInput'

/**
 * The SymptomPatternsPage component allows the admin to view the patterns of a specific symptom
 * and the common symptoms that occur with it.
 * The admin can select a symptom to view the patterns.
 * @returns {JSX.Element} The SymptomPatternsPage component
 */
const SymptomPatternsPage = () => {
	const [symptom, setSymptom] = useState('')
	const { loading, fetchSymptomPatterns, symptomPatterns } = useAdmin()
	const { symptoms, fetchSymptoms } = useSymptomLog()
	const navigate = useNavigate()

	useEffect(() => {
		// Fetch symptoms on component mount
		fetchSymptoms()

		// eslint-disable-next-line
	}, [])

	// Handle form submission for selecting a symptom
	const handleSubmit = (e) => {
		e.preventDefault()
		if (symptom === '') return

		// Fetch symptom patterns based on the selected symptom
		fetchSymptomPatterns(symptom)
	}

	return (
		<div className='container mx-auto'>
			<Button onClick={() => navigate('/')} variant='secondary'>
				Go Back
			</Button>
			<h1 className='text-2xl font-bold mt-2 mb-4 text-white text-center'>
				Symptom Patterns
			</h1>
			<form onSubmit={handleSubmit} className='flex space-x-4 justify-center'>
				<FormInput
					label='Symptom'
					type='text'
					value={symptom}
					onChange={(e) => setSymptom(e.target.value)}
					required={true}
				/>
				<div className='flex items-end'>
					<Button type='submit'>Submit</Button>
				</div>
			</form>
			{loading && <p className='text-white text-center'>Loading...</p>}
			{symptomPatterns && symptomPatterns.length > 0 && (
				<div className='mt-6'>
					<table className='min-w-full bg-gray-800 text-white'>
						<thead>
							<tr>
								<th className='py-2 px-4 border-b border-gray-700 text-left'>
									Symptom
								</th>
								<th className='py-2 px-4 border-b border-gray-700 text-left'>
									Count
								</th>
							</tr>
						</thead>
						<tbody>
							{symptomPatterns.map((pattern, index) => (
								<tr key={index}>
									<td className='py-2 px-4 border-b border-gray-700'>
										{pattern.name}
									</td>
									<td className='py-2 px-4 border-b border-gray-700'>
										{pattern.count}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}
export default SymptomPatternsPage
