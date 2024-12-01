import { useNavigate } from 'react-router-dom'
import Button from '../layout/Button'

const AdminDashboard = () => {
	const navigate = useNavigate()

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-3xl font-bold text-white mb-6'>Admin Dashboard</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				<div className='bg-gray-800 p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-white mb-4'>
						User Activity
					</h2>
					<p className='text-gray-400 mb-4'>
						View and analyze user activity over time.
					</p>
					<Button onClick={() => navigate('/activity/users')} variant='primary'>
						View User Activity
					</Button>
				</div>
				<div className='bg-gray-800 p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-white mb-4'>
						Symptoms By Location
					</h2>
					<p className='text-gray-400 mb-4'>
						Analyze symptoms reported by location.
					</p>
					<Button
						onClick={() => navigate('/symptoms/location')}
						variant='primary'>
						View Symptoms By Location
					</Button>
				</div>
				<div className='bg-gray-800 p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-white mb-4'>
						Symptom Patterns
					</h2>
					<p className='text-gray-400 mb-4'>
						Discover common symptom patterns.
					</p>
					<Button
						onClick={() => navigate('/symptoms/patterns')}
						variant='primary'>
						View Symptom Patterns
					</Button>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
