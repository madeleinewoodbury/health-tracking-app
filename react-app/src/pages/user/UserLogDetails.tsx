import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSymptomLog } from '../../hooks/symptomLog'
import Button from '../../layout/Button'

const UserLogDetails = () => {
	const { fetchSymptomLog, deleteSymptomLog, symptomLog, loading } =
		useSymptomLog()
	const { id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (id) {
			fetchSymptomLog(id)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this log?')) {
			deleteSymptomLog()
		}
	}

	return (
		<div className='container mx-auto text-white'>
			<Button onClick={() => navigate('/')} variant='secondary'>
				Go Back
			</Button>
			{/* <h1 className='text-2xl font-bold'>Symptom Log Details</h1> */}
			{symptomLog && (
				<div className='mt-4 bg-gray-800 p-4 rounded-lg shadow-md sm:p-8'>
					<h1 className='text-xl font-bold mb-4'>Symptom Log Details</h1>
					<p>
						<span className='text-gray-400 font-semibold'>Recorded At:</span>{' '}
						{new Date(symptomLog.recordedAt).toLocaleString()}
					</p>
					<p>
						<span className='text-gray-400 font-semibold'>Location:</span>{' '}
						{symptomLog.location.city},{' '}
						{symptomLog.location.state || symptomLog.location.country}
					</p>
					<h2 className='text-xl font-semibold mt-4'>Symptoms</h2>
					<div className='overflow-x-auto mt-2'>
						<table className='min-w-full bg-gray-800 rounded-lg shadow-md'>
							<thead>
								<tr className='bg-gray-700'>
									<th className='py-2 px-4 text-left'>Symptom</th>
									<th className='py-2 px-4 text-left'>Severity</th>
									<th className='py-2 px-4 text-left hidden sm:table-cell'>
										Start Date
									</th>
									<th className='py-2 px-4 text-left hidden sm:table-cell'>
										End Date
									</th>
									{/* <th className='py-2 px-4 text-left'>Description</th> */}
								</tr>
							</thead>
							<tbody>
								{symptomLog.symptoms.map((entry: any) => (
									<tr key={entry.id} className='border-b border-gray-700'>
										<td className='py-2 px-4'>{entry.name}</td>
										<td className='py-2 px-4'>{entry.severity}</td>
										<td className='py-2 px-4 hidden sm:table-cell'>
											{entry.symptomStart
												? new Date(entry.symptomStart).toDateString()
												: 'N/A'}
										</td>
										<td className='py-2 px-4 hidden sm:table-cell'>
											{entry.symptomEnd
												? new Date(entry.symptomEnd).toDateString()
												: 'N/A'}
										</td>
										{/* <td className='py-2 px-4'>{entry.description || 'N/A'}</td> */}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className='mt-6 flex justify-between'>
						<div className='flex gap-2'>
							<Button onClick={() => navigate('/edit-log')}>Edit</Button>
							<Button onClick={handleDelete} variant='danger'>
								Delete
							</Button>
						</div>
						{symptomLog.updatedAt !== symptomLog.recordedAt && (
							<p className='text-right text-sm'>
								<span className='text-gray-400 font-semibold block'>
									Last updated:{' '}
								</span>{' '}
								{new Date(symptomLog.updatedAt).toLocaleString()}
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
export default UserLogDetails
