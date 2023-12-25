Thank you for the opportunity to participate in the takehome portion of LeanData's interview process!
======

Summary & Tradeoffs/Considerations
------
#### Expense Tracker:
- I have designed and developed a blazing fast Expense Tracker application with the following features:
   1. User Management: Create, Edit, Delete users: [Imgur](https://i.imgur.com/O6DxBN0.png)
      - Forms with required elements/fields
      - Cascading changes for related data when editing, creating, or deleting a User.
      - Users table following required read-only column for total cost of that user and more.


   2. Expense Management: Create, Edit, Delete expenses: [Imgur](https://i.imgur.com/LSe32Ij.png)
      - Forms for adding/editing an expense
      - Cascade effects for changed data values


   3. Total Cost By Category: [Imgur](https://i.imgur.com/PJ3UuMR.png)
      - This is in the Dashboard component and aggregates the costs of each category for all users.
      - These values update automatically as you add/change Expense or User data.          


#### Database considerations: MySQL vs Postgres vs SQLite3
- Before choosing a database, I did thorough research on the tradeoffs between the above options.
- I wanted to use SQLite as I am most familiar with it, but after some *lite* research, I found that it would not be able to handle large datasets and thus, failing scalability considerations.
- MySQL was next up as I have utilized this database and leveraged the accompanying software MySQL Workbench to visualize/execute queries, but in doing research on it, I found that it was best used for read-only commands. However, I found discussions that praised PostgreSQL for its ability to handle massive datasets and excellence in read-write operations. After researching more, I only found more accounts of PostgreSQL being hailed as the best RDBMS system and decided it was exactly what I needed.

#### Frontend: React vs Angular
- I'll keep this short and honest. I wanted to use Angular as I have been exposed to the tech and thought it would be beneficial to include a technology in the LeanData tech stack, but decided it was best to use React as I am most comfortable with this library.


Setting Up Local Development Environment with PostgreSQL
------
This guide provides clear instructions on setting up a local development environment using Postgres.app for macOS and performing database migration and seeding from this repository.

### 1. Clone the Repository and install dependencies
###### - You can either download the zip file or use this command in the teriminal directory where you want to store it: `git clone https://github.com/Samsuhhh/LeanData.git`
###### 1a. Navigate to the frontend directory in your terminal and install dependencies using:
        ```
        npm i
        ```
###### 1b. Then, navigate to the backend directory in your terminal and install dependencies again using the same command above.

### 2. FOR MacOS: Navigate to [Postgres.app](https://postgresapp.com/downloads.html) and download Postgres.app@v15
###### - You can also download [Postico](https://eggerapps.at/postico2/) through their free version (1.5).
###### - Postico is a database client that allows you to connect to a local database and perform common tasks like creating tables or executing queries.
###### - Note: You need MacOS 10.15 (Catalina) or newer.
      
### 3a. Open Postgres.app and start the PostgresSQL server locally.
###### - This database is completely empty at the moment, but we will execute database migrations and load seeder data shortly.
### 3b. Navigate to the backend directory, open the config folder, and open the config.json file.
###### - In this file, you must change the following values to match your local Postgres.app server and then SAVE the changes:
        ```
        "development": {
        "username": "<NAME OF YOUR DB>",
        "password": null,
        "database": "<NAME OF YOUR DB>",
        "host": "127.0.0.1",
        "dialect": "postgres"
        },
        ```
        
Please use this image ([Imgur](https://i.imgur.com/Kq3T2p6.png)) for reference, but note that the the host value is defaulted to "127.0.0.1" if you are running it on your localhost, but this may differ so please double check.

###### Notice that the username and database values in the picture reflects what is seen on Postgres.app

### 4a. Create a .env file in the BACKEND directory.
###### - In your /backend/.env file, establish your backend PORT variable. This represents the port number where your backend server will listen for incoming requests.
###### - It is crucial that you choose a port that is available for proper functionality!
###### - It should look something like this: 
        ```
        PORT=8000
        ```        
### 4b. Create a .env file in the FRONTEND directory.
###### - In your /frontend/.env file, establish your VITE_URL variable. This represents the base URL where the frontend application will make API requests.
###### - It is crucial that you choose a port that is available for proper functionality!
###### - It should look something like this:
        ```
        VITE_URL=http://localhost:8000/api
        ```
### 5. Migrate the database using sequelize-cli to make sure you set everything up correctly:
        ```
        npx dotenv sequelize db:migrate:all
        ```
###### - You can check if you've done it correctly by using this command to see if the migrations successfully executed their 'up'-load:
        ```
        npx dotenv sequelize db:migrate:status
        ```        
### 6. Seed the demo data using sequelize-cli
###### - Migrate the seed file by running the following command in your backend terminal:
        ```
        npx dotenv sequelize db:seed:all
        ```
### 7. At this point, you have successfully set up your local environment!
###### - Split your terminal and navigate to the backend directory. Here, start your backend server using:
        ```
        npm start
        ```
###### - Now use the other terminal and navigate to the frontend directory. Here, start your frontend using:
        ```
        npm run dev
        ```
### WE MADE IT! You are now free to explore the functionality of my Expense Tracker application. I hope you enjoy it as much as I did creating it!


Some honest comments about my project:
I spent a lot of the alloted time on finishing the MVPs of the project and planned to improve styling, update code structure, and implement pagination after completing all the base requirements. Unfortunately, I ran into a lot of issues when trying to host Postgresql through heroku and was not able to reach my goals. I truly wanted to impress with my frontend capabilities, but the form stylings and overall css does not meet my standards, but I hope the functionality is enough to impress. I'm still extremely proud of what I've built, but I was striving to go above and beyond your expectations so I apologize I couldn't do that for you this time around but hope I can show you my full capabilities in the future!


