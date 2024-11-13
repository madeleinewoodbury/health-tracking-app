import { createContext, useState } from 'react'
import { CountryContextType, Country } from '../types/country'

const CountryContext = createContext<CountryContextType | null>(null)

import { ReactNode } from 'react'

export const CountryProvider = ({ children }: { children: ReactNode }) => {
	const [countries, setCountries] = useState<Country[]>([])

	const fetchCountries = async () => {
		try {
			const response = await fetch('/server/api/country')
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			setCountries(data.data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<CountryContext.Provider value={{ countries, fetchCountries }}>
			{children}
		</CountryContext.Provider>
	)
}

export default CountryContext
