import { useContext } from 'react'
import ProviderContext from '../context/ProviderContext'
import { ProviderContextType } from '../types/provider'

/**
 * Hook to access provider context and methods
 * Provides access to provider data and fetch method
 * 
 * @returns {ProviderContextType} Provider context and state
 */
export const useProvider = (): ProviderContextType => {
	const context = useContext(ProviderContext)
	if (!context) {
		throw new Error('useProvider must be used within a ProviderProvider')
	}

	return context
}
