import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface CountryAPI {
	name: {
		common: string
	}
	cca2: string
}

async function main() {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all')
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		// Add type assertion here
		const data = (await response.json()) as CountryAPI[]

		// Validate data
		if (!Array.isArray(data)) {
			throw new Error('Expected array of countries')
		}

		for (const country of data) {
			if (!country.name?.common || !country.cca2) {
				console.warn('Skipping invalid country:', country)
				continue
			}

			await prisma.country.create({
				data: {
					name: country.name.common,
					alpha2: country.cca2,
					active: true,
				},
			})
		}

		console.log('Seeding completed successfully')
	} catch (error) {
		console.error('Seeding failed:', error)
		throw error
	}
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
