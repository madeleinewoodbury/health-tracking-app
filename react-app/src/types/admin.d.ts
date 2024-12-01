export interface AdminContextType {
	fetchGeographicClusters: () => void
	loading: boolean
	geographicClusters: GeographicCluster[]
}

export interface GeographicCluster {
	location: string
	cluster: number
	symptoms: number
}
