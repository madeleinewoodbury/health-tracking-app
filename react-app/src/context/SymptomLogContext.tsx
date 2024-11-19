import { createContext, useState, ReactNode } from 'react'
import { SymptomLogContextType, SymptomLog } from '../types/symptomLog'

const SymptomLogContext = createContext<SymptomLogContextType | null>(null)

export const SymptomLogProvider = ({ children }: { children: ReactNode }) => {
	const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([])
	const [symptomLog, setSymptomLog] = useState<SymptomLog | null>(null)
	const [loading, setLoading] = useState(false)

	const fetchSymptomLogs = async () => {
		try {
			setLoading(true)
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
		} finally {
			setLoading(false)
		}
	}

	const fetchSymptomLog = async (logId: string) => {
		try {
			setLoading(true)
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('User not authenticated')
			}

			const response = await fetch(`/server/api/user-symptom-log/${logId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			const log = data.data

			setSymptomLog({
				id: log.id,
				recordedAt: new Date(log.recordedAt),
				updatedAt: new Date(log.updatedAt),
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
			})
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const deleteSymptomLog = async () => {
		try {
			setLoading(true)

			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('User not authenticated')
			}

			const logId = symptomLog?.id

			const response = await fetch(`/server/api/user-symptom-log/${logId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			setSymptomLog(null)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<SymptomLogContext.Provider
			value={{
				fetchSymptomLogs,
				fetchSymptomLog,
				deleteSymptomLog,
				symptomLogs,
				symptomLog,
				loading,
			}}>
			{children}
		</SymptomLogContext.Provider>
	)
}

export default SymptomLogContext
