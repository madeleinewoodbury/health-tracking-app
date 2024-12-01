import GeographicClusters from './GeographicClusters'
import { AdminProvider } from '../context/AdminContext'

const AdminDashboard = () => {
	return (
		<AdminProvider>
			<div className='mt-6'>
				<p className='text-white'>Admin Dashboard</p>
				<GeographicClusters />
			</div>
		</AdminProvider>
	)
}

export default AdminDashboard
