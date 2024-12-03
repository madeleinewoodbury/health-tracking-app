import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../hooks/admin'
import LineChart from '../../components/charts/LineChart'
import FormInput from '../../components/forms/FormInput'
import Button from '../../layout/Button'

/**
 * This component displays the line chart with unique users per day for a given date range.
 * The admin can select a start date and end date to view the user activity.
 *
 * @returns {JSX.Element} Line chart with user activity
 */
const UserActivityPage = () => {
	const { loading, userActivity, fetchUserActivity } = useAdmin()
	// Set default start date to 30 days before today
	const [startDate, setStartDate] = useState(() => {
		const date = new Date()
		date.setDate(date.getDate() - 30)
		return date.toISOString().split('T')[0]
	})
	const [endDate, setEndDate] = useState(() => {
		const date = new Date()
		return date.toISOString().split('T')[0]
	})
	const navigate = useNavigate()

	// Handle form submission to fetch user activity data
	const handleSubmit = (e) => {
		e.preventDefault()
		if (startDate === '' || endDate === '') return

		// Check if start date is before end date
		if (new Date(startDate) > new Date(endDate)) {
			alert('Start date must be before end date')
			return
		}

		// Fetch user activity
		fetchUserActivity(startDate, endDate)
	}

	return (
		<div className='container mx-auto'>
			<Button onClick={() => navigate('/')} variant='secondary'>
				Go Back
			</Button>
			<h1 className='text-2xl font-bold mt-2 mb-4 text-white text-center'>
				User Activity
			</h1>

			<form onSubmit={handleSubmit} className='flex space-x-4 justify-center'>
				<FormInput
					label='Start Date'
					type='date'
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
					required={true}
				/>
				<FormInput
					label='End Date'
					type='date'
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
					required={true}
				/>
				<div className='flex items-end'>
					<Button type='submit'>Submit</Button>
				</div>
			</form>
			{loading && <p>Loading...</p>}
			{userActivity && (
				<div className='mt-10 text-white flex justify-center'>
					<LineChart data={userActivity} />
				</div>
			)}
		</div>
	)
}

export default UserActivityPage
