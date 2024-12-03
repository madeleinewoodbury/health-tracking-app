import { useContext } from 'react'
import CountryContext from '../context/CountryContext'
import { CountryContextType } from '../types/country'

/**
 * Hook to access country context and methods
 * Provides access to country data and fetch method
 * 
 * @returns {CountryContextType} Country context data
 */ 
export const useCountry = (): CountryContextType => {
	const context = useContext(CountryContext)
	if (!context) {
		throw new Error('useCountry must be used within a CountryProvider')
	}

	return context
}
