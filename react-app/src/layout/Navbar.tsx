import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { useSymptomLog } from '../hooks/symptomLog'

/**
 * Navbar component that displays the navigation links based on the user's authentication and role.
 * The provider role will have the option to view logs, while the patient role will not.
 * @returns {JSX.Element} Navbar component
 */
const Navbar = () => {
	const { isAuthenticated, logout, user } = useAuth()
	const { resetState } = useSymptomLog()
	// Function to determine the class of the link based on whether it is active or not
	const linkClass = ({ isActive }: { isActive: boolean }) =>
		isActive
			? 'border-b-2 border-blue-400 text-blue-400'
			: 'border-b-2 border-transparent hover:text-blue-400'

	// Function to handle the logout button click event and reset the state
	const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		resetState()
		logout()
	}

	return (
		<nav className='py-8'>
			<div className='flex justify-between text-white container mx-auto px-4'>
				<NavLink to='/' className='text-xl font-bold'>
					SymptomLogger
				</NavLink>
				<div className='flex gap-8'>
					{isAuthenticated ? (
						<>
							{user?.role === 'PROVIDER' && (
								<NavLink to='/view-logs' className={linkClass}>
									View Logs
								</NavLink>
							)}
							<button
								className='text-white hover:text-blue-400'
								onClick={handleLogout}>
								Logout
							</button>
						</>
					) : (
						<>
							<NavLink to='/login' className={linkClass}>
								Login
							</NavLink>
							<NavLink to='/register' className={linkClass}>
								Register
							</NavLink>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}
export default Navbar
