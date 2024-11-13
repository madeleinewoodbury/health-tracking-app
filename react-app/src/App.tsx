import { AuthProvider } from './context/AuthContext'
import { CountryProvider } from './context/CountryContext'
import { RegisterForm } from './components/RegisterForm'

const App = () => {
	return (
		<AuthProvider>
			<CountryProvider>
				<RegisterForm />
			</CountryProvider>
		</AuthProvider>
	)
}

export default App
