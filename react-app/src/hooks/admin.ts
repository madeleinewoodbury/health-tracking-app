import { useContext } from 'react'
import AdminContext from '../context/AdminContext'
import { AdminContextType } from '../types/admin'

/**
 * Hook to access admin context values
 * Provides access to admin state and methods
 *
 * @returns {AdminContextType} Admin context values
 */
export const useAdmin = (): AdminContextType => {
	const context = useContext(AdminContext)
	if (!context) {
		throw new Error('useAdmin must be used within a AdminProvider')
	}

	return context
}
