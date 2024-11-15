import { useContext } from 'react'
import SymptomLogContext from '../context/SymptomLogContext'
import { SymptomLogContextType } from '../types/symptomLog'

export const useSymptomLog = (): SymptomLogContextType => {
	const context = useContext(SymptomLogContext)
	if (!context) {
		throw new Error('useSymptomLog must be used within a SymptomLogProvider')
	}

	return context
}
