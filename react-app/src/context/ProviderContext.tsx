import { createContext, useState, ReactNode } from 'react'
import { ProviderContextType, ProviderProfile } from '../types/provider'

const ProviderContext = createContext<ProviderContextType | null>(null)

export const ProviderProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState(false)
	const [providerProfile, setProviderProfile] =
		useState<ProviderProfile | null>(null)

	const getProviderProfile = async () => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('User not authenticated')
			}

			const response = await fetch(`/server/api/provider/user`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			setProviderProfile(data.data)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const createProviderProfile = async (formData) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('User not authenticated')
			}

			const response = await fetch('/server/api/provider', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			setProviderProfile(data.data)

			return true
		} catch (error) {
			console.error(error)
			return false
		} finally {
			setLoading(false)
		}
	}

	const updateProviderProfile = async (formData) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('User not authenticated')
			}

			if (!providerProfile) {
				throw new Error('Provider profile not found')
			}

			const response = await fetch(
				`/server/api/provider/${providerProfile.id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				}
			)
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			setProviderProfile(data.data)

			return true
		} catch (error) {
			console.error(error)
			return false
		} finally {
			setLoading(false)
		}
	}

	const deleteProviderProfile = async () => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('User not authenticated')
			}

			if (!providerProfile) {
				throw new Error('Provider profile not found')
			}

			const response = await fetch(
				`/server/api/provider/${providerProfile.id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			setProviderProfile(null)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<ProviderContext.Provider
			value={{
				loading,
				providerProfile,
				getProviderProfile,
				createProviderProfile,
				updateProviderProfile,
				deleteProviderProfile,
			}}>
			{children}
		</ProviderContext.Provider>
	)
}

export default ProviderContext
