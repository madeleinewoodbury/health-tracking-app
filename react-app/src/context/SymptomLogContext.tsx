import { createContext, useState, ReactNode } from 'react'
import { SymptomLogContextType, SymptomLog } from '../types/symptomLog'

const SymptomLogContext = createContext<SymptomLogContextType | null>(null)

export const SymptomLogProvider = ({ children }: { children: ReactNode }) => {
	const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([])

	const fetchSymptomLogs = async () => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('User not authenticated')
			}

			const response = await fetch('/server/api/user-symptom-log', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			console.log(data.data)

			const logs = data.data.map((log: any) => ({
				id: log.id,
				recordedAt: new Date(log.recordedAt),
				location: {
					city: log.location.city,
					state: log.location.state || null,
					country: log.location.country.name,
				},
				symptoms: log.userSymptomEntries.map((entry: any) => ({
					id: entry.symptom.id,
					name: entry.symptom.name,
					severity: entry.severity || null,
					description: entry.description || null,
					symptomStart: entry.symptomStart
						? new Date(entry.symptomStart)
						: null,
					symptomEnd: entry.symptomEnd ? new Date(entry.symptomEnd) : null,
				})),
			}))

			setSymptomLogs(logs)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<SymptomLogContext.Provider value={{ fetchSymptomLogs, symptomLogs }}>
			{children}
		</SymptomLogContext.Provider>
	)
}

export default SymptomLogContext
