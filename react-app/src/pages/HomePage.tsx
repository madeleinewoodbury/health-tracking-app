import { useAuth } from '../hooks/auth'
import UserDashboard from '../components/UserDashboard'
import ProviderDashboard from '../components/ProviderDashboard'
import AdminDashboard from '../components/AdminDashboard'

const HomePage = () => {
	const { user } = useAuth()

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold text-white'>
				Welcome, {user?.username}
			</h1>
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
