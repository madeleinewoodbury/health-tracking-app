interface SymptomLogContextType {
	fetchSymptomLogs: () => void
	symptomLogs: SymptomLog[]
}

export interface SymptomLog {
	id: string
	recordedAt: Date
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
