interface SymptomLogContextType {
	fetchUserSymptomLogs: () => void
	fetchSymptomLogs: () => void
	fetchSymptomLog: (logId: string) => void
	deleteSymptomLog: () => void
	fetchSymptoms: () => void
	createSymptomLog: (formData: SymptomLogFormData) => Promise<boolean>
	updateSymptomLog: (
		logId: string,
		formData: SymptomLogFormData
	) => Promise<boolean>
	resetState: () => void
	userSymptomLogs: UserSymptomLog[]
	symptoms: Symptom[]
	symptomLogs: SymptomLog[]
	symptomLog: SymptomLog | null
	loading: boolean
}

export interface SymptomLog {
	id: string
	recordedAt: Date
	updatedAt: Date | null
	location: {
		city: string
		state: string | null
		country: string
	}
	symptoms: SymptomEntry[]
}

export interface SymptomEntry {
	id: string
	name: string
	severity: number | null
	description: string | null
	symptomStart: Date | null
	symptomEnd: Date | null
}

export interface UserSymptomLog {
	id: string
	recordedAt: Date
	location: {
		city: string
		state: string | null
		country: string
	}
	user: {
		id: string,
		age: number
		gender: string
		country: {
			name: string
		}
	},
	userSymptomEntries: SymptomEntry[]
}