import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSymptomLog } from '../hooks/symptomLog'
import Button from '../layout/Button'

/**
 * The UserDashboard component displays the user's previous symptom logs and provides a button to create a new log.
 * Only authenticated users can access this page.
 * @returns {JSX.Element} The UserDashboard component
 */
const UserDashboard = () => {
	const navigate = useNavigate()
	const { fetchSymptomLogs, symptomLogs } = useSymptomLog()

	useEffect(() => {
		fetchSymptomLogs()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Redirect to the log detail page when a row is clicked
	const handleRowClick = (logId: string) => {
		navigate(`/log/${logId}`)
	}

	return (
		<>
			<div className='mt-6'>
				{symptomLogs.length > 0 ? (
					<div>
						<h2 className='text-lg font-semibold text-white mb-2'>
							Your Previous Logs
						</h2>
						<div className='overflow-x-auto'>
							<table className='min-w-full bg-gray-800 rounded-lg shadow-md'>
								<thead>
									<tr className='bg-gray-700 text-white'>
										<th className='py-2 px-4 text-left'>Date</th>
										<th className='py-2 px-4 text-left'>Location</th>
										<th className='py-2 px-4 text-left'>Symptoms - Severity</th>
									</tr>
								</thead>
								<tbody>
									{symptomLogs.map((log) => (
										<tr
											key={log.id}
											className='border-b border-gray-700 text-gray-200 cursor-pointer hover:bg-gray-700'
											onClick={() => handleRowClick(log.id)}>
											<td className='py-2 px-4'>
												{new Date(log.recordedAt).toDateString()}
											</td>
											<td className='py-2 px-4'>
												{log.location.city},{' '}
												{log.location.state || log.location.country}
											</td>
											<td className='py-2 px-4'>
												<ul className='list-disc list-inside'>
													{log.symptoms.map((symptom) => (
														<li key={symptom.id} className='list-none'>
															{symptom.name} - {symptom.severity}
														</li>
													))}
												</ul>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<p className='text-white'>You have no logs yet.</p>
				)}
			</div>
			<div className='mt-6'>
				<Button onClick={() => navigate('/new-log')} variant='primary'>
					Enter a New Log
				</Button>
			</div>
		</>
	)
}

export default UserDashboard
