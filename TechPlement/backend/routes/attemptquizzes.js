import express from 'express';
const router = express.Router();
import QuizResult from '../models/QuizResult.js';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import Quiz from '../models/Quiz.js';

// Route to fetch all attempted quizzes
router.get('/attempts', auth, async (req, res) => {
  try {
    const results = await QuizResult.find()
      .populate('quizId', 'title creatorId')
      .populate('userId', 'username email');
    
    const formattedResults = results.map(result => ({
      _id: result._id,
      quizTitle: result.quizId.title,
      creatorId: result.quizId.creatorId,
      userId: result.userId._id,
      username: result.userId.username,
      email: result.userId.email,
      score: result.score,
      total: result.total,
      duration: result.duration,
      date: result.date
    }));

    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attempts' });
  }
});

export default router;
