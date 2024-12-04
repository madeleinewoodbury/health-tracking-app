/**
 * Authentication Context and Provider for managing user authentication state
 * Handles user registration, login, logout and session persistence
 */
import { createContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'react-toastify'
import {
	AuthContextType,
	RegisterFormData,
	LoginFormData,
	User,
} from '../types/auth'

/**
 * Context for authentication state and methods
 * Provides user data, authentication status and auth methods
 */
const AuthContext = createContext<AuthContextType | null>(null)

/**
 * Authentication Provider Component
 * Manages authentication state and provides auth methods to children
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		// Check authentication status on mount
		getUser()
	}, [])

	/**
	 * Fetches current authenticated user data
	 * Uses stored JWT token to validate session
	 */
	const getUser = async () => {
		try {
			const token = localStorage.getItem('token')

			if (!token) {
				throw new Error('Token not found')
			}

			const response = await fetch('/server/auth/user', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			setUser(data.user)
			setIsAuthenticated(true)
		} catch (error) {
			console.error(error)
		}
	}

	/**
	 * Registers a new user
	 * Stores JWT token and updates auth state on success
	 *
	 * @param {RegisterFormData} formData - Registration form data
	 */
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
				toast.error('Registration failed!')
				throw new Error(data.message)
			}

			setUser(data.user)
			localStorage.setItem('token', data.token)
			setIsAuthenticated(true)
			toast.success('Registration successful!')
		} catch (error) {
			console.error(error)
		}
	}

	/**
	 * Logs in an existing user
	 * Stores JWT token and updates auth state on success
	 *
	 * @param {LoginFormData} formData - Login form data
	 */
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
				toast.error(data.message)
				throw new Error(data.message)
			}

			setUser(data.user)
			localStorage.setItem('token', data.token)
			setIsAuthenticated(true)
			toast.success('Login successful!')
		} catch (error) {
			console.error(error)
		}
	}

	/**
	 * Logs out the current user
	 * Clears stored token and resets auth state
	 */
	const logout = () => {
		// Logout user
		setUser(null)
		localStorage.removeItem('token')
		setIsAuthenticated(false)
	}

	// Provide auth state and methods to children
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
