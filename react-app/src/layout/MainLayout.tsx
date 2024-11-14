import { Outlet } from 'react-router-dom'
import Navbar from '../layout/Navbar'

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<main className='container mx-auto'>
				<Outlet />
			</main>
		</>
	)
}
export default MainLayout
