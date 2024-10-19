import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Import routes and middleware
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quiz.js';
import userRoutes from './routes/userRoutes.js';
import auth from './middleware/auth.js';
import QuizResult from './routes/quizResult.js';
import AttemptTest from './routes/attemptquizzes.js';

// Configure environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', auth, quizRoutes); 
app.use('/api/auth', auth, userRoutes); 
app.use('/api/auth', auth, QuizResult); 
app.use('/api/auth', auth, AttemptTest); 

// Root route
app.get('/', (req, res) => res.send('Server is running...'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
