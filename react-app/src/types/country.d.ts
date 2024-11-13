interface CountryContextType {
	countries: Country[]
	fetchCountries: () => void
}

export interface Country {
	id: string
	name: string
	alpha2: string
}
