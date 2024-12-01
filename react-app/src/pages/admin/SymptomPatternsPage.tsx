import { useNavigate } from 'react-router-dom'
import Button from '../../layout/Button'

const SymptomPatternsPage = () => {
	const navigate = useNavigate()

	return (
		<div className='container mx-auto text-white'>
			<Button onClick={() => navigate('/')} variant='secondary'>
				Go Back
			</Button>
			<h1 className='text-2xl font-bold mt-2'>Symptom Patterns</h1>
		</div>
	)
}
export default SymptomPatternsPage
