import { useContext } from 'react'
import CountryContext from '../context/CountryContext'
import { CountryContextType } from '../types/country'

export const useCountry = (): CountryContextType => {
	const context = useContext(CountryContext)
	if (!context) {
		throw new Error('useCountry must be used within a CountryProvider')
	}

	return context
}
