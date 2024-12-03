import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSymptomLog } from '../../hooks/symptomLog'
import Button from '../../layout/Button'

/**
 * Displays a list of user symptom logs with the ability to expand each row to view more details.
 */
const ViewSymptomLogs = () => {
	const navigate = useNavigate()
	const { fetchUserSymptomLogs, userSymptomLogs, loading } = useSymptomLog()
	const [expandedRow, setExpandedRow] = useState<string | null>(null)

	useEffect(() => {
		fetchUserSymptomLogs()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Function to handle row click
	const handleRowClick = (logId: string) => {
		setExpandedRow(expandedRow === logId ? null : logId)
	}

	return (
		<>
			<div className='container mx-auto text-white'>
				<Button onClick={() => navigate('/')} variant='secondary'>
					Go Back
				</Button>
				{loading && <p className='text-white'>Loading...</p>}
				{userSymptomLogs.length > 0 ? (
					<div className='mt-4'>
						<h2 className='text-lg font-semibold text-white mb-2'>
							User Symptom Logs
						</h2>
						<div className='overflow-x-auto'>
							<table className='min-w-full bg-gray-800 rounded-lg shadow-md'>
								<thead>
									<tr className='bg-gray-700 text-white'>
										<th className='py-2 px-4 text-left'>Gender - Age</th>
										<th className='py-2 px-4 text-left'>Date</th>
										<th className='py-2 px-4 text-left'>Location</th>
										<th className='py-2 px-4 text-left'>Symptoms - Severity</th>
									</tr>
								</thead>
								<tbody>
									{userSymptomLogs.map((log) => (
										<>
											<tr
												key={log.id}
												className='border-b border-gray-700 text-gray-200 cursor-pointer hover:bg-gray-700'
												onClick={() => handleRowClick(log.id)}>
												<td className='py-2 px-4'>
													{log.user.gender} - {log.user.age}
												</td>
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

											{/* Expanded row to show more deails */}
											{expandedRow === log.id && (
												<tr className='bg-gray-700 text-white'>
													<td colSpan={4} className='py-2 px-4'>
														<div>
															<p>
																<strong>Nationality:</strong>{' '}
																{log.user.country.name}
															</p>
															<p>
																<strong>Location:</strong> {log.location.city},{' '}
																{log.location.state
																	? `${log.location.state}, `
																	: ''}
																{log.location.country}
															</p>
															<p>
																<strong>Recorded At:</strong>{' '}
																{new Date(log.recordedAt).toLocaleString()}
															</p>
															<h4 className='text-lg font-bold border-b border-white mt-2'>
																Symptoms
															</h4>
															<ul className='my-1'>
																{log.symptoms.map((symptom) => (
																	<li key={symptom.id} className='mb-4'>
																		<p>
																			<strong>Name:</strong> {symptom.name}
																		</p>
																		<p>
																			<strong>Severity:</strong>{' '}
																			{symptom.severity ?? 'N/A'}
																		</p>
																		<p>
																			<strong>Duration:</strong>{' '}
																			{symptom.symptomStart
																				? new Date(
																						symptom.symptomStart
																				  ).toLocaleDateString()
																				: 'N/A'}{' '}
																			-{' '}
																			{symptom.symptomEnd
																				? new Date(
																						symptom.symptomEnd
																				  ).toLocaleDateString()
																				: 'N/A'}
																		</p>
																		<p>
																			<strong>Description:</strong>{' '}
																			{symptom.description ?? 'N/A'}
																		</p>
																	</li>
																))}
															</ul>
														</div>
													</td>
												</tr>
											)}
										</>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<p className='text-white'>No logs was found</p>
				)}
			</div>
		</>
	)
}

export default ViewSymptomLogs
