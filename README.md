# Symptom Logger

A health registration and symptom tracking service where users can register and log their symptoms, providing valuable insights to healthcare professionals and administrators.

## Overview

Users can register within the browser-based front-end and log their symptoms. Healthcare providers will have their own login credentials with access as providers and can view symptom logs registered by users. Administrators can see user activity, symptom logging trends by locations, and patterns of symptoms commonly registered together.

The application is built with Node.js in the backend for the API, using PostgreSQL as the database and Prisma ORM for database management. The frontend is a React application.

## Key Features

- **User Symptom Tracking**: Detailed symptom logging by registered users
- **Role-Based Access Control**: Secure access for different user types (USER, PROVIDER, ADMIN)
- **Activity Tracking and Data Analysis**: Insights for administrators and healthcare providers

## Technologies

- **Backend**:

  - Node.js with TypeScript
  - REST API Design
  - Prisma ORM
  - PostgreSQL Database

- **Frontend**:
  - React
  - TypeScript
  - Tailwind CSS

## Architecture

### Roles and Access

1. **Users**

   - Register and logs health related symptoms
   - Can view and manage personal symptom logs
   - Limited access to personal data only

2. **Providers (Doctors/Clinicians)**

   - View user registered symptom logs
   - Restricted access to patient information
   - Can view and manage their profile

3. **Administrators**
   - User activity tracking
   - Symptom tracking by location
   - Symptom logging patterns

### Security Features

- Role-based access control
- Password hashing
- Data privacy protection
- Middleware for tracking user activities
- IP address logging
- Secure endpoint management

## API Design

### Authentication Endpoints

- `POST /auth/register`: User registration
- `POST /auth/login`: User/Provider/Admin login
- `GET /auth/user`: Gets the logged in user

### Symptom Endpoints

- `GET /api/symptom`: Retrieve all symptoms from the databse
- `GET /api/symptom/:id`: Retrieve symptom by id
- `POST /api/symptom`: Create new symptom
- `PUT /api/symptom/:id`: Update existing symptom
- `DELETE /api/symptoms/:id`: Delete a symptom

### Country Endpoints

- `GET /api/country`: Retrive all countries from the database
- `GET /api/country/:id`: Retrive conuntry by id
- `POST /api/country`: Create new country
- `PUT /api/country/:id`: Update existing country
- `DELETE /api/coutry/:id`: Delete a country

### User Symptom Log Endpoints

- `GET /api/user-symptom-log`: Retrieve all user symptom logs by logged in user
- `GET /api/user-symptom-log/:logId`: Retrieve a symptom log by id
- `POST /api/user-symptom-log`: Create a new user symptom log
- `PUT /api/user-symptom-log/:logId`: Update an existing user symptom log
- `DELETE /api/user-symptom-log/:logId`: Delete a user symptom log

### Provider Endpoints

- `GET /api/provider`: Retrieve all providers
- `GET /api/provider/user`: Retrieve providers associated with the logged in user
- `GET /api/provider/:id`: Retrieve a specific provider by id
- `POST /api/provider`: Create a new provider
- `PUT /api/provider/:id`: Update an existing provider
- `DELETE /api/provider/:id`: Delete a provider

### Admin Endpoints

- `GET /admin/geographic`: Get symptoms and counts by location
- `GET /admin/activity`: Retrieve unique users for a given time period
- `GET /admin/symptoms`: Retrieve most commonly registered symptoms by given symptom.

### Report Endpoints

- `GET /api-report/user-symptom-log`: Get all user symptom logs along with user's age, gender, and nationality.

### API Documentation

The full API documentation is available and has been generated with Swagger and ReDoc. You can access it through the following links:

- **Swagger UI**: [http://localhost:5200/api-docs](http://localhost:5200/api-docs)
- **ReDoc**: [http://localhost:5200/redoc](http://localhost:5200/redoc)

### Authentication

The API uses JWT for authentication. You need to include the token in the `Authorization` header for protected routes.

### Error Handling

The API returns standard HTTP status codes to indicate the success or failure of an API request. Error responses include a message field with a description of the error.

## Implementation Status

### Frontend Implementation Notes

The frontend application currently implements core functionality but several API features remain to be implemented:

#### Not Yet Implemented

- CRUD operations for symptoms and countries
- Provider lookup functionality for users
- Admin dashboard features
- Geographic data visualization (usage of latitude and longitude data)
- Advanced filtering and search capabilities

#### Currently Implemented

- User registration and authentication
- CRUD operations for user symptom logging and provider profiles
- Viewing personal symptom logs
- Provider access to symptom logs
- Basic admin access to view user activity and symptom patterns

### Backend Implementation Notes

The backend application currently implements core functionality but several features remain to be implemented:

#### Not Yet Implemented

- Strategy for handling growing activity logs

#### Currently Implemented

- User registration and authentication
- CRUD operations for symptoms, countries, user symptom logs, and provider profiles
- Role-based access control
- Activity tracking middleware
- Error handling and input validation

## Database Design

The application's database is designed to provide a flexible system for tracking health symptoms, user interactions, and geographical contexts. The data model emphasizes relationships between users, symptoms, locations, and system activities. A view of the ER-model can be found in the `docs` folder.

### User Management and Profiling

The `User` model is the central entity of the application, representing individuals who interact with the system. Users are classified into three distinct roles:

- `USER`: Standard users who log their personal health symptoms
- `PROVIDER`: Healthcare professionals with extended access to symptom insights
- `ADMIN`: System administrators with comprehensive monitoring capabilities

Each user includes:

- Demographic information (age, gender, nationality)
- Authentication details (username, email, hashed password)
- User role. (USER, ADMIN or PROVIDER)

The `ProviderProfile` extension allows healthcare professionals to add professional details like specialty, name, and associated location.

#### Symptom Tracking System

- `Symptom`: A list of possible health symptoms

  - Serves as a standardized reference for symptom categorization
  - Includes descriptive information about each symptom

- `UserSymptomLog`: Represents a user's specific log entry

  - Links a user to a specific geographical location
  - Acts as a container for multiple symptom entries

- `UserSymptomEntry`: Detailed symptom recording
  - Captures individual symptom details within a log
  - Tracks severity, start and end dates
  - Allows for symptom description

This approach enables:

- Detailed symptom tracking
- Logging of multiple symptoms within a log
- Only logging of valid symptoms available in the database

#### Geographical Context

- `Country`: Provides a standardized geographical reference

  - Uses alpha-2 codes for global compatibility
  - Supports international health trend analysis

- `Location`: Represents specific geographical points
  - Latitude and longitude coordinates
  - City and state

The location models support:

- Geographical tagging for symptoms
- User and provider location associations
- Potential future heat mapping of health trends

#### Activity Context

The `ActivityLog` contains user activity data:

- Tracks all user interactions within the system
- Captures request methods, endpoints, and roles
- Logs IP addresses for security and analytical purposes (obtained trough the reques object)
- Optional geographical context for each activity (not implemented)

### Performance Optimization

- Indexed fields for faster querying
- Efficient relationship mapping and database queries with Prisma
- Normalized database structure
- Middleware for lightweight request tracking

## Geocoding and Location Services

- Validate city and state inputs
- Convert location names to coordinates using [Api Ninjas Geocoding API](https://api-ninjas.com/api/geocoding)
- Initial country data is obtained from [REST Countries](https://restcountries.com/)
- Future expansion for map-based visualizations (not implemented)

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- Docker (optional)
- PostgreSQL (if not using Docker)
- npm or yarn

### Setup

#### Using Docker

1. **Set up Docker Database Container**

- Ensure Docker is running on your machine.
- In the root directory of the project, run:

```sh
docker-compose up -d
```

3.**Import Database Data**

- Copy the SQL dump file into the Docker container (make sure you're in the root directory of the project):

```sh
docker cp db_dump.sql health-tracker-db:/db_dump.sql
```

- Run sql script to add data to database

```sh
docker exec -i health-tracker-db psql -U postgres -d health-tracker-db -f /db_dump.sql
```

4. **Set Up Environment Variables**

- Navigate to the Node API folde

```sh
cd node-api
```

- Make sure a .env file in the node-api directory with the environment variables. Example:

```sh
DATABASE_URL="postgresql://your_username:your_password@localhost:5431/health-tracker-db"
```

5. **Install dependencies**

- Make sure you are in the `node-api` directory

```sh
npm install
```

6. **Generate the Prisma Client**

```sh
npx prisma generate
```

- Push the Prisma schema to the database

```sh
npx prisma db push
```

7. **Run the Server**

```sh
npm run dev
```

8. **Setup the React Application**

- Navigate the to the `react-app`

```sh
# From the root directory
cd react-app
```

- Install dependencies

```sh
npm install
```

- Run the React app

```sh
npm run dev
```

#### Without Docker

1. **Set Up PostgreSQL Locally**

- Install PostgreSQL on your machine.
- Create a new database:

```sh
createdb health-tracker-db
```

2. **Import Database Data**
   Run the SQL script to add data to the database:

```sh
psql -U your_username -d health-tracker-db -f db_dump.sql
```

3. **Set up API and React App**

- Follow the steps 4-8 from above

## Accessing the Application

- Backend API: [http://localhost:5200](http://localhost:5200)
- Frontend Application: [http://localhost:3000](http://localhost:3000)
- Swagger UI: [http://localhost:5200/api-docs](http://localhost:5200/api-docs)
- ReDoc: [http://localhost:5200/redoc](http://localhost:5200/redoc)

### Accessing Prisma Studio

Prisma Studio is a visual editor for your database. You can use it to view and edit your data.

- Run Prisma Studio:

```sh
npx prisma studio
```

- Access Prisma Studio: [http://localhost:5555](http://localhost:5555)
