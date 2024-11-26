import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
} from 'react-router-dom'
import { useAuth } from './hooks/auth'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserLogDetails from './pages/UserLogDetails'
import AddLogPage from './pages/AddLogPage'

const Router = () => {
	const AuthProtectedRoute = ({ element }: { element: JSX.Element }) => {
		const { isAuthenticated } = useAuth()
		return isAuthenticated ? element : <Navigate to='/login' />
	}

	const router = createBrowserRouter(
		createRoutesFromElements([
			<Route path='/' element={<MainLayout />}>
				<Route index element={<AuthProtectedRoute element={<HomePage />} />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route
					path='/log/:id'
					element={<AuthProtectedRoute element={<UserLogDetails />} />}
				/>
				<Route
					path='/new-log'
					element={<AuthProtectedRoute element={<AddLogPage />} />}
				/>
			</Route>,
		])
	)

	return <RouterProvider router={router} />
}
export default Router
