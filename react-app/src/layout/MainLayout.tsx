import { Outlet } from 'react-router-dom'
import Navbar from '../layout/Navbar'

/**
 * MainLayout component wraps the Navbar and Outlet components
 */
const MainLayout = () => {
	return (
		<>
			<Navbar />
			<main className='container mx-auto p-4'>
				<Outlet />
			</main>
		</>
	)
}
export default MainLayout
