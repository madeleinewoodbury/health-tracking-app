import { useContext } from 'react'
import ProviderContext from '../context/ProviderContext'
import { ProviderContextType } from '../types/provider'

export const useProvider = (): ProviderContextType => {
	const context = useContext(ProviderContext)
	if (!context) {
		throw new Error('useProvider must be used within a ProviderProvider')
	}

	return context
}
