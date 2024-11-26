import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import { CountryProvider } from './context/CountryContext'
import { SymptomLogProvider } from './context/SymptomLogContext'
import Router from './Router'

const App = () => {
	return (
		<AuthProvider>
			<CountryProvider>
				<SymptomLogProvider>
					<Router />
					<ToastContainer position='bottom-right' autoClose={3000} />
				</SymptomLogProvider>
			</CountryProvider>
		</AuthProvider>
	)
}

export default App
