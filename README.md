Thank you for the opportunity to participate in the takehome portion of LeanData's interview process!
======

Summary & Tradeoffs/Considerations
------


Setting Up Local Development Environment with PostgreSQL
------
This guide provides clear instructions on setting up a local development environment using Postgres.app for macOS and performing database migration and seeding from this repository.

### 1. Clone the Repository and install dependencies
###### - You can either download the zip file or use this command in the teriminal directory where you want to store it: `git clone https://github.com/Samsuhhh/LeanData.git`
###### 1a. Navigate to the frontend directory in your terminal and install dependencies using:
        ```bash
        npm i
        ```
###### 1b. Then, navigate to the backend directory in your terminal and install dependencies again using the same command above.

### 2. FOR MacOS: Navigate to [Postgres.app](https://postgresapp.com/downloads.html) and download Postgres.app@v15
###### - You can also download [Postico](https://eggerapps.at/postico2/) through their free version (1.5).
###### - Postico is a database client that allows you to connect to a local database and perform common tasks like creating tables or executing queries.
###### - Note: You need MacOS 10.15 (Catalina) or newer.
      
### 3. Open Postgres.app and start the PostgresSQL server locally.
###### - This database is completely empty at the moment, but we will execute database migrations and load seeder data shortly.
      
### 4a. Create a .env file in the BACKEND directory.
###### - In your /backend/.env file, establish your backend PORT variable. This represents the port number where your backend server will listen for incoming requests.
###### - It is crucial that you choose a port that is available for proper functionality!
###### - It should look something like this: 
        ```text
        PORT=8000
        ```        
### 4b. Create a .env file in the FRONTEND directory.
###### - In your /frontend/.env file, establish your VITE_URL variable. This represents the base URL where the frontend application will make API requests.
###### - It is crucial that you choose a port that is available for proper functionality!
###### - It should look something like this:
        ```text
        VITE_URL=http://localhost:8000/api
        ```
### 5. Migrate the database using sequelize-cli to make sure you set everything up correctly:
        ```bash
        npx dotenv sequelize db:migrate:all
        ```
###### - You can check if you've done it correctly by using this command to see if the migrations successfully executed their 'up'-load:
        ```bash
        npx dotenv sequelize db:migrate:status
        ```        
### 6. Seed the demo data using sequelize-cli
###### - Migrate the seed file by running the following command in your backend terminal:
        ```bash
        npx dotenv sequelize db:seed:all
        ```
### 7. At this point, you have successfully set up your local environment!
###### - Split your terminal and navigate to the backend directory. Here, start your backend server using:
        ```bash
        npm start
        ```
###### - Now use the other terminal and navigate to the frontend directory. Here, start your frontend using:
        ```bash
        npm run dev
        ```
### WE MADE IT! You are now free to explore the functionality of my Expense Tracker application. I hope you enjoy it as much as I did creating it!
