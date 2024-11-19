import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserLogDetails from './pages/UserLogDetails'

const Router = () => {
	const router = createBrowserRouter(
		createRoutesFromElements([
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/log/:id' element={<UserLogDetails />} />
			</Route>,
		])
	)

	return <RouterProvider router={router} />
}
export default Router
