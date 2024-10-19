import express from 'express';
import Quiz from '../models/Quiz.js';
import auth from '../middleware/auth.js';


const router = express.Router();

// Create a quiz
router.post('/quizzes', auth, async (req, res) => {
  const { title, description, quiz_time, questions } = req.body;
  try {
    const newQuiz = new Quiz({
      title,
      description,
      quiz_time,
      questions,
      createdBy: req.user.id,
    });
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Read all quizzes
router.get('/all-quizzes', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Read only created quizzes
router.get('/quizzes', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user.id });
    res.json(quizzes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get quiz by ID
router.get('/quizzes/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update quiz
router.put('/quizzes/:id', auth, async (req, res) => {
  const { title, questions } = req.body;
  try {
    let quiz = await Quiz.findById(req.params.id);
    if (!quiz || quiz.createdBy.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Quiz not found' });
    }
    quiz.title = title || quiz.title;
    quiz.questions = questions || quiz.questions;
    await quiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete quiz
router.delete('/quizzes/:id', auth, async (req, res) => {
  try {
    console.log('Delete request received for quiz with id:', req.params.id);
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      console.log('Quiz not found');
      return res.status(404).json({ msg: 'Quiz not found' });
    }

    if (quiz.createdBy.toString() !== req.user.id) {
      console.log('User not authorized to delete this quiz');
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await quiz.remove();
    console.log('Quiz removed successfully');
    res.json({ msg: 'Quiz removed' });
  } catch (err) {
    console.error('Server error:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).send('Server Error');
  }
});


export default router;
