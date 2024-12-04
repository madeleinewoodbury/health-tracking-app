/**
 * Seed script to populate the database with initial data like countries and symptoms.
 */

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface CountryAPI {
	name: {
		common: string
	}
	cca2: string
}

async function seedCountries() {
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

async function seedSymptoms() {
	const symptoms = [
		{
			name: 'Fever',
			description:
				'An elevated body temperature, often indicative of an infection.',
		},
		{
			name: 'Cough',
			description:
				'A reflex action to clear your airways of mucus and irritants.',
		},
		{
			name: 'Shortness of Breath',
			description:
				'Difficulty breathing or feeling like you cannot get enough air.',
		},
		{
			name: 'Fatigue',
			description: 'A feeling of extreme tiredness or lack of energy.',
		},
		{ name: 'Headache', description: 'Pain in the head or upper neck.' },
		{
			name: 'Sore Throat',
			description:
				'Pain or irritation in the throat that can worsen when swallowing.',
		},
		{
			name: 'Nausea',
			description:
				'A sensation of unease and discomfort in the stomach with an urge to vomit.',
		},
		{
			name: 'Vomiting',
			description:
				'Forcible voluntary or involuntary emptying of stomach contents through the mouth.',
		},
		{
			name: 'Diarrhea',
			description: 'Frequent loose or liquid bowel movements.',
		},
		{
			name: 'Loss of Smell',
			description: 'Reduced or inability to smell, known as anosmia.',
		},
		{
			name: 'Loss of Taste',
			description:
				'Reduced or inability to taste, often associated with anosmia.',
		},
		{
			name: 'Chills',
			description: 'Cold sensations accompanied by shivering.',
		},
		{
			name: 'Muscle Pain',
			description: 'Pain or discomfort in the muscles, also known as myalgia.',
		},
		{
			name: 'Joint Pain',
			description: 'Pain, discomfort, or stiffness in the joints.',
		},
		{ name: 'Runny Nose', description: 'Excess drainage from the nose.' },
		{
			name: 'Congestion',
			description: 'A feeling of stuffiness in the nasal passages.',
		},
		{
			name: 'Dizziness',
			description: 'A feeling of lightheadedness, unsteadiness, or vertigo.',
		},
		{
			name: 'Chest Pain',
			description:
				'Discomfort or pain in the chest, may indicate a serious condition.',
		},
		{
			name: 'Rash',
			description:
				'Changes in skin appearance, such as redness, bumps, or itchiness.',
		},
		{
			name: 'Abdominal Pain',
			description: 'Discomfort or pain in the stomach area.',
		},
		{
			name: 'Swelling',
			description:
				'An abnormal enlargement of a body part due to fluid buildup or inflammation.',
		},
		{
			name: 'Blurred Vision',
			description:
				'Lack of sharpness in vision or inability to see fine details.',
		},
		{
			name: 'Itching',
			description:
				'A tingling or irritating sensation that makes you want to scratch the affected area.',
		},
		{
			name: 'Skin Redness',
			description:
				'Red discoloration of the skin caused by irritation or inflammation.',
		},
		{
			name: 'Dry Mouth',
			description:
				'A lack of saliva leading to a dry or parched feeling in the mouth.',
		},
		{
			name: 'Sweating',
			description: 'Excessive perspiration, often caused by heat or stress.',
		},
		{
			name: 'Palpitations',
			description: 'A feeling of a fast, pounding, or irregular heartbeat.',
		},
		{
			name: 'Tingling',
			description:
				'A prickling or "pins and needles" sensation, usually felt in the extremities.',
		},
		{ name: 'Weakness', description: 'A lack of physical strength or energy.' },
		{
			name: 'Back Pain',
			description: 'Discomfort or pain in the upper, middle, or lower back.',
		},
		{
			name: 'Weight Loss',
			description: 'Unintentional decrease in body weight.',
		},
		{
			name: 'Weight Gain',
			description: 'Unintentional increase in body weight.',
		},
		{
			name: 'Fainting',
			description:
				'A temporary loss of consciousness due to reduced blood flow to the brain.',
		},
		{
			name: 'Difficulty Swallowing',
			description: 'Trouble swallowing food or liquids, known as dysphagia.',
		},
		{ name: 'Insomnia', description: 'Difficulty falling or staying asleep.' },
		{
			name: 'Night Sweats',
			description:
				'Excessive sweating during sleep, often drenching nightclothes and bedding.',
		},
		{
			name: 'Cold Hands and Feet',
			description:
				'Unusually cold extremities, often caused by poor circulation.',
		},
		{
			name: 'Numbness',
			description: 'Loss of sensation or feeling in part of the body.',
		},
		{
			name: 'Hearing Loss',
			description: 'Partial or complete inability to hear sounds.',
		},
		{
			name: 'Ear Pain',
			description: 'Discomfort or pain in or around the ear.',
		},
		{
			name: 'Difficulty Concentrating',
			description: 'Trouble focusing or maintaining attention on tasks.',
		},
		{
			name: 'Memory Loss',
			description: 'Inability to remember events or information.',
		},
		{
			name: 'Mood Swings',
			description:
				'Rapid changes in emotional state, such as going from happy to sad quickly.',
		},
		{
			name: 'Irritability',
			description: 'Excessive sensitivity or annoyance in response to stimuli.',
		},
		{
			name: 'Anxiety',
			description:
				'Feelings of worry, fear, or unease, often without a clear cause.',
		},
		{
			name: 'Depression',
			description:
				'A persistent feeling of sadness, emptiness, or hopelessness.',
		},
		{
			name: 'Seizures',
			description:
				'Sudden, uncontrolled electrical disturbances in the brain causing changes in behavior, movements, or consciousness.',
		},
		{
			name: 'Tremors',
			description:
				'Involuntary, rhythmic shaking of a body part, such as the hands or head.',
		},
	]

	for (const symptom of symptoms) {
		await prisma.symptom.create({
			data: symptom,
		})
	}

	console.log('Seeded symptoms data successfully!')
}

async function main() {
	// await seedCountries()
	// await seedSymptoms()
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
