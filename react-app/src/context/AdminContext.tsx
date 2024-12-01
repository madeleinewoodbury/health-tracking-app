import { createContext, useState, ReactNode } from 'react'
import { AdminContextType, GeographicCluster } from '../types/admin'

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState(false)
	const [geographicClusters, setGeographicClusters] = useState<
		GeographicCluster[]
	>([])

	const fetchGeographicClusters = async () => {
		try {
			console.log('Fetching geographic clusters...')
			setLoading(true)
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('User not authenticated')
			}

			const response = await fetch('/server/admin/geographic', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			console.log(data)
			setGeographicClusters(data)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<AdminContext.Provider
			value={{
				fetchGeographicClusters,
				loading,
				geographicClusters,
			}}>
			{children}
		</AdminContext.Provider>
	)
}

export default AdminContext
