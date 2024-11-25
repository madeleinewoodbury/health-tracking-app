import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Disable strict mode in development mode to avoid double rendering
if (process.env.NODE_ENV === 'development') {
	createRoot(document.getElementById('root')!).render(<App />)
} else {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<App />
		</StrictMode>
	)
}
