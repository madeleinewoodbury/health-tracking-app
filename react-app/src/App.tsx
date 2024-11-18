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
				</SymptomLogProvider>
			</CountryProvider>
		</AuthProvider>
	)
}

export default App
