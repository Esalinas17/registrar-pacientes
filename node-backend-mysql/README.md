# Node.js MySQL User Registration API

This project is a Node.js backend application built with TypeScript that allows for user registration in a MySQL database. The application captures user data including name, RUT, address, medication, dosage, age, contact, health facility, and pathology.

## Project Structure

```
node-backend-mysql
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers
│   │   └── userController.ts # Handles user-related requests
│   ├── models
│   │   └── userModel.ts      # Defines user schema and database interactions
│   ├── routes
│   │   └── userRoutes.ts     # Sets up user-related routes
│   ├── database
│   │   └── index.ts          # Database connection setup
│   └── types
│       └── user.ts           # User data structure definition
├── package.json               # NPM dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── Dockerfile                 # Docker image setup
├── docker-compose.yml         # Docker Compose configuration
└── README.md                  # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd node-backend-mysql
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure the MySQL database:**
   Update the database connection settings in `src/database/index.ts` to match your MySQL configuration.

4. **Build the Docker image:**
   ```
   docker build -t node-backend-mysql .
   ```

5. **Run the application with Docker Compose:**
   ```
   docker-compose up
   ```

## Usage

Once the application is running, you can register users by sending a POST request to the `/users/register` endpoint with the required user data in the request body.

## API Endpoints

- **POST /users/register**: Register a new user.

## License

This project is licensed under the MIT License.