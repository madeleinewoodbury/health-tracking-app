import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CountryProvider } from './context/CountryContext'
import MainLayout from './layout/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements([
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Route>,
		])
	)

	return (
		<AuthProvider>
			<CountryProvider>
				<RouterProvider router={router} />
			</CountryProvider>
		</AuthProvider>
	)
}

export default App
