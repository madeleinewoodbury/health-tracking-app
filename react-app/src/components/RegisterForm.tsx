import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { RegisterFormData } from '../types/auth'

export const RegisterForm = () => {
	const { register } = useAuth()

	const [formData, setFormData] = useState<RegisterFormData>({
		username: '',
		email: '',
		password: '',
		passwordConfirmation: '',
		age: 18,
		gender: 'FEMALE',
		nationality: '',
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (formData.password !== formData.passwordConfirmation) {
			alert('Passwords do not match')
			return
		}

		register(formData)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto mt-16 p-6 bg-neutral-800 rounded-lg shadow-md space-y-6'>
			<div className='space-y-1'>
				<label className='block text-sm font-medium text-gray-200'>
					Username
				</label>
				<input
					type='text'
					value={formData.username}
					onChange={(e) =>
						setFormData({ ...formData, username: e.target.value })
					}
					required
					className='w-full px-3 py-2 bg-neutral-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				/>
			</div>

			<div className='space-y-1'>
				<label className='block text-sm font-medium text-gray-200'>Email</label>
				<input
					type='email'
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					required
					className='w-full px-3 py-2 bg-neutral-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				/>
			</div>

			<div className='space-y-1'>
				<label className='block text-sm font-medium text-gray-200'>
					Password
				</label>
				<input
					type='password'
					value={formData.password}
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
					minLength={8}
					required
					className='w-full px-3 py-2 bg-neutral-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				/>
			</div>

			<div className='space-y-1'>
				<label className='block text-sm font-medium text-gray-200'>
					Confirm Password
				</label>
				<input
					type='password'
					value={formData.passwordConfirmation}
					onChange={(e) =>
						setFormData({ ...formData, passwordConfirmation: e.target.value })
					}
					minLength={8}
					required
					className='w-full px-3 py-2 bg-neutral-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				/>
			</div>

			<div className='space-y-1'>
				<label className='block text-sm font-medium text-gray-200'>Age</label>
				<input
					type='number'
					value={formData.age}
					onChange={(e) =>
						setFormData({ ...formData, age: parseInt(e.target.value) })
					}
					required
					className='w-full px-3 py-2 bg-neutral-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				/>
			</div>

			<div className='space-y-1'>
				<label className='block text-sm font-medium text-gray-200'>
					Gender
				</label>
				<select
					value={formData.gender}
					onChange={(e) =>
						setFormData({
							...formData,
							gender: e.target.value as RegisterFormData['gender'],
						})
					}
					required
					className='w-full px-3 py-2 bg-neutral-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
					<option value='MALE'>Male</option>
					<option value='FEMALE'>Female</option>
					<option value='OTHER'>Other</option>
				</select>
			</div>

			<div className='space-y-1'>
				<label className='block text-sm font-medium text-gray-200'>
					Nationality
				</label>
				<input
					type='text'
					value={formData.nationality}
					onChange={(e) =>
						setFormData({ ...formData, nationality: e.target.value })
					}
					required
					className='w-full px-3 py-2 bg-neutral-300 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
				/>
			</div>

			<button
				type='submit'
				className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200'>
				Register
			</button>
		</form>
	)
}
