import { AuthProvider } from './context/AuthContext'
import { RegisterForm } from './components/RegisterForm'

const App = () => {
	return (
		<AuthProvider>
			<RegisterForm />
		</AuthProvider>
	)
}

export default App
