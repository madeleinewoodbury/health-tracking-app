import { useAuth } from '../hooks/auth'
import UserDashboard from '../components/UserDashboard'
import ProviderDashboard from '../components/ProviderDashboard'
import AdminDashboard from '../components/AdminDashboard'

const HomePage = () => {
	const { user } = useAuth()

	return (
		<div className='container mx-auto p-4'>
			{user?.role === 'ADMIN' ? (
				<AdminDashboard />
			) : user?.role === 'PROVIDER' ? (
				<ProviderDashboard />
			) : (
				<UserDashboard />
			)}
		</div>
	)
}

export default HomePage
