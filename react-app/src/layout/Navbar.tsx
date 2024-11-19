import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

const Navbar = () => {
	const { isAuthenticated, logout } = useAuth()
	const linkClass = ({ isActive }: { isActive: boolean }) =>
		isActive
			? 'border-b-2 border-blue-400 text-blue-400'
			: 'border-b-2 border-transparent hover:text-blue-400'

	const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
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
						<button
							className='text-white hover:text-blue-400'
							onClick={handleLogout}>
							Logout
						</button>
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