import { Express } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'

/**
 * Swagger options for generating the API documentation
 */
export const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Symptom Logger API',
			version: '1.0.0',
			description: 'API documentation for the Symptom Logger API',
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT}`,
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
	apis: ['./src/routes/*.ts'],
}

// Generate the OpenAPI specification
const swaggerSpec = swaggerJSDoc(swaggerOptions)

// Write the swagger.json file to the project root
fs.writeFileSync(
	path.join(__dirname, '../../swagger.json'),
	JSON.stringify(swaggerSpec, null, 2)
)

/**
 * Sets up the Swagger UI middleware
 * @param app - The Express application
 */
export const setupSwagger = (app: Express) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
