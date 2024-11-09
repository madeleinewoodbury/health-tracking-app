interface GeocodingResponse {
	name: string
	latitude: number
	longitude: number
	country: string
	state?: string
}

interface LocationDataResponse {
	city: string
	state?: string
	countryCode: string
}

/**
 * Finds or updates a location in the database based on the provided city, state, and country.
 *
 * @param tx - The transaction object used to interact with the database.
 * @param city - The name of the city.
 * @param country - The country object containing the country details.
 * @param state - The name of the state (optional).
 * @returns The location object from the database.
 * @throws Will throw an error if coordinates for the location cannot be found.
 */
export const findOrUpdateLocation = async (tx, city, country, state) => {
	let location

	if (state) {
		// Check if location already exists in database
		location = await tx.location.findFirst({
			where: { city, state, countryId: country.id },
		})

		if (location) {
			return location
		}
	}

	// Get coordinates for location - required for new location
	const coordinates = await getCoordinates(city, country.alpha2, state)
	if (!coordinates) {
		throw new Error('Coordinates not found. Please check the location details.')
	}

	// Check if location already exists in database by coordinates
	location = await tx.location.findFirst({
		where: {
			latitude: coordinates.latitude,
			longitude: coordinates.longitude,
		},
	})

	// Update existing location with missing state field if it exists
	if (location && !location.state && coordinates.state) {
		location = await tx.location.update({
			where: { id: location.id },
			data: { state: coordinates.state },
		})
	}

	// Create new location if it doesn't exist
	if (!location) {
		location = await tx.location.create({
			data: {
				city,
				state: coordinates.state || state,
				latitude: coordinates.latitude,
				longitude: coordinates.longitude,
				countryId: country.id,
			},
		})
	}

	return location
}

/**
 * Fetches the geographical coordinates (latitude and longitude) for a given city and country,
 * with an optional state parameter to refine the search.
 *
 * @param city - The name of the city to geocode.
 * @param country - The name of the country where the city is located.
 * @param state - (Optional) The name of the state to refine the search.
 * @returns A promise that resolves to a `GeocodingResponse` object containing the coordinates,
 *          or `null` if the geocoding fails or no results are found.
 *
 * @throws Will log an error message to the console if the fetch request fails or if no results are found.
 */
export const getCoordinates = async (
	city: string,
	country: string,
	state?: string
): Promise<GeocodingResponse | null> => {
	try {
		const params = new URLSearchParams({
			city,
			country,
		})

		const response = await fetch(
			`https://api.api-ninjas.com/v1/geocoding?${params}`,
			{
				headers: {
					'X-Api-Key': process.env.API_NINJAS_KEY as string,
				},
			}
		)

		if (!response.ok) {
			console.error('Geocoding failed:', response.statusText)
			return null
		}

		const data = (await response.json()) as GeocodingResponse[]

		if (data.length === 0) {
			console.error('No results found for location')
			return null
		}

		// Check for first matching state in response
		if (state) {
			const matchingState = data.find((location) => location.state === state)
			if (matchingState) {
				return matchingState
			}
		}

		// Return first result if no state is provided or no matching state is found
		return data[0]
	} catch (error) {
		console.error('Geocoding error:', error)
		return null
	}
}

/**
 * Fetches location data based on latitude and longitude using the API Ninjas reverse geocoding service.
 *
 * @param lat - The latitude of the location.
 * @param lon - The longitude of the location.
 * @returns A promise that resolves to a `LocationDataResponse` object containing the location data, or `null` if the request fails or no results are found.
 *
 * @throws Will log an error message to the console if the fetch request fails or if no results are found.
 */
export const getLocationData = async (
	lat: number,
	lon: number
): Promise<LocationDataResponse | null> => {
	try {
		const params = new URLSearchParams({
			lat: lat.toString(),
			lon: lon.toString(),
		})

		const response = await fetch(
			`https://api.api-ninjas.com/v1/reversegeocoding?${params}`,
			{
				headers: {
					'X-Api-Key': process.env.API_NINJAS_KEY as string,
				},
			}
		)

		if (!response.ok) {
			console.error('Reverse geocoding failed:', response.statusText)
			return null
		}

		const data = (await response.json()) as LocationDataResponse[]

		if (data.length === 0) {
			console.error('No results found for location')
			return null
		}

		return data[0]
	} catch (error) {
		console.error('Reverse geocoding error:', error)
		return null
	}
}
