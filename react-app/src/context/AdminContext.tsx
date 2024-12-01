import { createContext, useState, ReactNode } from 'react'
import {
	AdminContextType,
	UserActvity,
	SymptomByLocation,
	Symptom,
} from '../types/admin'

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState(false)
	const [userActivity, setUserActivity] = useState<UserActvity[]>([])
	const [symptomsByLocation, setSymptomsByLocation] = useState<
		SymptomByLocation[]
	>([])
	const [symptomPatterns, setSymptomPatterns] = useState<Symptom[]>([])

	const fetchUserActivity = async (startDate: string, endDate: string) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')

			if (!token) {
				throw new Error('No token found')
			}

			const params = new URLSearchParams({ startDate, endDate })

			const response = await fetch(`/server/admin/activity?${params}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				throw new Error('Failed to fetch user activity')
			}

			const data = await response.json()
			setUserActivity(data)
		} catch (error) {
			console.error('Error fetching user activity:', error)
		} finally {
			setLoading(false)
		}
	}

	const fetchSymptomsByLocation = async (
		country: string,
		city: string,
		state: string | null = null
	) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')

			if (!token) {
				throw new Error('No token found')
			}

			const params = new URLSearchParams({ country, city })
			if (state) {
				params.append('state', state)
			}

			const response = await fetch(`/server/admin/geographic?${params}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				throw new Error('Failed to fetch symptoms by location')
			}

			const data = await response.json()
			setSymptomsByLocation(data.symptoms)
		} catch (error) {
			console.error('Error fetching symptoms by location:', error)
		} finally {
			setLoading(false)
		}
	}

	const fetchSymptomPatterns = async (symptom: string) => {
		try {
			setLoading(true)

			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('No token found')
			}

			const params = new URLSearchParams({ symptom })

			const response = await fetch(`/server/admin/symptoms?${params}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (!response.ok) {
				throw new Error('Failed to fetch symptom patterns')
			}

			const data = await response.json()
			setSymptomPatterns(data)
		} catch (error) {
			console.error('Error fetching symptom patterns:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<AdminContext.Provider
			value={{
				fetchUserActivity,
				fetchSymptomsByLocation,
				fetchSymptomPatterns,
				loading,
				userActivity,
				symptomsByLocation,
				symptomPatterns,
			}}>
			{children}
		</AdminContext.Provider>
	)
}

export default AdminContext
