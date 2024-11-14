import { createContext, useState } from 'react'
import {
	AuthContextType,
	RegisterFormData,
	LoginFormData,
	User,
} from '../types/auth'

const AuthContext = createContext<AuthContextType | null>(null)

import { ReactNode } from 'react'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const register = async (formData: RegisterFormData) => {
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
			localStorage.setItem('token', data.token)
			setIsAuthenticated(true)
		} catch (error) {
			console.error(error)
		}
	}

	const login = async (formData: LoginFormData) => {
		// Login user
		try {
			const response = await fetch('/server/auth/login', {
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
			localStorage.setItem('token', data.token)
			setIsAuthenticated(true)
		} catch (error) {
			console.error(error)
		}
	}

	const logout = () => {
		// Logout user
		setUser(null)
		localStorage.removeItem('token')
		setIsAuthenticated(false)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				register,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
