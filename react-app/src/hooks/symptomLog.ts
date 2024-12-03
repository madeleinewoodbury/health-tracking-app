import { useContext } from 'react'
import SymptomLogContext from '../context/SymptomLogContext'
import { SymptomLogContextType } from '../types/symptomLog'

/**
 * Hook to access symptom log context and methods
 * Provides access to symptom log data and fetch method
 * 
 * @returns SymptomLogContextType
 */
export const useSymptomLog = (): SymptomLogContextType => {
	const context = useContext(SymptomLogContext)
	if (!context) {
		throw new Error('useSymptomLog must be used within a SymptomLogProvider')
	}

	return context
}
