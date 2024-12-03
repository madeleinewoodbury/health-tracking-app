import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import { CountryProvider } from './context/CountryContext'
import { SymptomLogProvider } from './context/SymptomLogContext'
import { ProviderProvider } from './context/ProviderContext'
import Router from './Router'

/**
 * The main component of the application.
 * It wraps the entire application with the context providers and the router.
 */ 
const App = () => {
	return (
		<AuthProvider>
			<CountryProvider>
				<SymptomLogProvider>
					<ProviderProvider>
						<Router />
					</ProviderProvider>
					<ToastContainer position='bottom-right' autoClose={3000} />
				</SymptomLogProvider>
			</CountryProvider>
		</AuthProvider>
	)
}

export default App
