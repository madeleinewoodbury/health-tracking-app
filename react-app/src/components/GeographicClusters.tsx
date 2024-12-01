import { useEffect } from 'react'
import { useAdmin } from '../hooks/admin'
import ScatterPlot from './ScatterPlot'

const GeographicClusters = () => {
	const { fetchGeographicClusters, geographicClusters, loading } = useAdmin()

	useEffect(() => {
		fetchGeographicClusters()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div>
			{loading && <p>Loading...</p>}
			{geographicClusters.length > 0 && (
				<div className='bg-gray-800 rounded p-8 my-4'>
					<ScatterPlot data={geographicClusters} />
				</div>
			)}
		</div>
	)
}

export default GeographicClusters
