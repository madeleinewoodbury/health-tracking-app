export interface ProviderContextType {
	getProviderProfile: () => void
	createProviderProfile: (formData: ProviderProfileFormData) => Promise<boolean>
	updateProviderProfile: (formData: ProviderProfileFormData) => Promise<boolean>
	deleteProviderProfile: () => void
	loading: boolean
	providerProfile: ProviderProfile | null
}

export interface ProviderProfile {
	id: string
	firstName: string
	lastName: string
	specialty: string
	title: string
	location: {
		city: string
		state: string | null
		country: {
			id: string
			name: string
			alpha2: string
		}
	}
}

export interface ProviderProfileFormData {
	firstName: string
	lastName: string
	specialty: string
	title: string
	location: {
		city: string
		state: string
		countryCode: string
	}
}
