import { useNavigate } from 'react-router-dom'
import Button from '../../layout/Button'

const SymptomsByLocationPage = () => {
	const navigate = useNavigate()

	return (
		<div className='container mx-auto text-white'>
			<Button onClick={() => navigate('/')} variant='secondary'>
				Go Back
			</Button>
			<h1 className='text-2xl font-bold mt-2'>Symptoms by Location</h1>
		</div>
	)
}
export default SymptomsByLocationPage
