import { createContext, useState } from 'react'
import { AuthContextType, User } from '../types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)

	const register = async (formData) => {
		// Register user
		try {
			const response = await fetch('/server/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			setUser(data.user)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				register,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
