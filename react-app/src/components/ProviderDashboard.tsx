import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProvider } from '../hooks/provider'
import Button from '../layout/Button'

/**
 * The ProviderDashboard component displays the provider's profile details and
 * provides options to edit or delete the profile.
 * If the provider has not created a profile yet, the component displays a button
 * to add a new profile.
 * Only authenticated providers or admin users can access this component.
 *
 * @returns JSX.Element - ProviderDashboard component
 */
const ProviderDashboard = () => {
	const navigate = useNavigate()
	const { getProviderProfile, providerProfile, deleteProviderProfile } =
		useProvider()

	useEffect(() => {
		// Fetch the provider's profile if it doesn't exist
		if (!providerProfile) {
			getProviderProfile()
		}

		// eslint-disable-next-line
	}, [])

	const handleDelete = () => {
		// Show a confirmation dialog before deleting the profile
		if (window.confirm('Are you sure you want to delete your profile?')) {
			deleteProviderProfile()
		}
	}

	return (
		<div className='container mx-auto p-6'>
			<h1 className='text-3xl font-bold text-white mb-6'>Provider Dashboard</h1>
			{providerProfile ? (
				<div className='bg-gray-800 p-6 rounded-lg shadow-md'>
					<h2 className='text-xl font-semibold text-white mb-4'>
						Profile Details
					</h2>
					<p className='text-white mb-2'>
						<strong>Full Name:</strong> {providerProfile.firstName}{' '}
						{providerProfile.lastName}
					</p>
					<p className='text-white mb-2'>
						<strong>Specialty:</strong> {providerProfile.specialty}
					</p>
					<p className='text-white mb-2'>
						<strong>Title:</strong> {providerProfile.title}
					</p>
					<p className='text-white mb-2'>
						<strong>Location:</strong> {providerProfile.location.city},{' '}
						{providerProfile.location.state
							? `${providerProfile.location.state}, `
							: ''}
						{providerProfile.location.country.name}
					</p>
					<div className='flex space-x-4 mt-4'>
						<Button onClick={() => navigate('/edit-profile')} variant='primary'>
							Edit Profile
						</Button>
						<Button onClick={handleDelete} variant='danger'>
							Delete Profile
						</Button>
					</div>
				</div>
			) : (
				<div className='flex'>
					<Button onClick={() => navigate('/add-profile')} variant='primary'>
						Add Profile
					</Button>
				</div>
			)}
		</div>
	)
}

export default ProviderDashboard
