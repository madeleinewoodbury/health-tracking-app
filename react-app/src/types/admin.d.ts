export interface AdminContextType {
	fetchUserActivity: (startDate: string, endDate: string) => void
	fetchSymptomsByLocation: (
		country: string,
		city: string,
		state?: string | null
	) => void
	fetchSymptomPatterns: (symptom: string) => void
	loading: boolean
	userActivity: UserActvity[]
	symptomsByLocation: Symptom[]
	symptomPatterns: Symptom[]
}

export interface UserActvity {
	date: string
	uniqueUsers: number
}

export interface Symptom {
	name: string
	count: number
}
