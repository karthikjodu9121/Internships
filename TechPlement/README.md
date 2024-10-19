# MERN Quiz App

Welcome to the MERN Quiz App! This project consists of a frontend built with Create React App and a backend built with Node.js and Express.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Project Details](#project-details)
  - [Technologies Used](#technologies-used)
  - [Modules](#modules)
  - [Database](#database)
- [Learn More](#learn-more)

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org).

### Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Baibhavkr001/Techplement-Internship-QuizApp.git
    ```

2. **Install dependencies for the frontend:**

    ```bash
    cd frontend
    npm install
    ```

3. **Install dependencies for the backend:**

    ```bash
    cd ../backend
    npm install
    ```

## Available Scripts

### Frontend

In the frontend directory, you can run:

- **Start the development server:**

    ```bash
    npm start
    ```

    Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

- **Run tests:**

    ```bash
    npm test
    ```

    Launches the test runner in interactive watch mode. See the section about running tests for more information.

- **Build for production:**

    ```bash
    npm run build
    ```

    Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

### Backend

In the backend directory, you can run:

- **Start the server:**

    ```bash
    npm start
    ```

    Starts the Node.js server. The server will run on [http://localhost:5000](http://localhost:5000) by default.

- **Start the server with nodemon:**

    ```bash
    npm run dev
    ```

    Starts the Node.js server with nodemon for automatic restarts during development.

## Project Details

### Technologies Used

- **Frontend:**
  - React
  - Create React App
  - Axios
  - React Router

- **Backend:**
  - Node.js
  - Express
  - Mongoose
  - JWT (JSON Web Tokens) for authentication
  - Bcrypt for password hashing

### Modules

- **Authentication Module:**
  - User registration and login
  - Token-based authentication

- **Quiz Management Module:**
  - Create, edit, and delete quizzes
  - View all quizzes created by the user

- **Quiz Attempt Module:**
  - Attempt quizzes
  - View quiz results

- **Profile Module:**
  - View profile based on login uers
  - Edit/Update profile details

### Database

- **MongoDB:**
  - Used as the database to store user data, quizzes, and quiz results
  - Mongoose is used for object data modeling (ODM) to interact with MongoDB

## Learn More

- You can learn more about Create React App in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- To learn more about React, check out the [React documentation](https://reactjs.org/docs/getting-started.html).
- For more information on Node.js, visit the [Node.js documentation](https://nodejs.org/en/docs/).
- For more information on Express, visit the [Express documentation](https://expressjs.com/).
- To learn more about MongoDB, visit the [MongoDB documentation](https://docs.mongodb.com/).
