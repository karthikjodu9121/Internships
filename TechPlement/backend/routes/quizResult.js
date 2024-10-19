import express from 'express';
import QuizResult from '../models/QuizResult.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/results/:id', auth, async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request params:', req.params);
  console.log('Request user:', req.user);

  const { score, total, duration, quizTitle } = req.body;  // Added quizTitle
  const quizId = req.params.id;
  const userId = req.user.id;
  const username = req.user.username;
  const email = req.user.email;

  console.log('Score:', score);
  console.log('Total:', total);
  console.log('Duration:', duration);  // Log the duration
  console.log('Quiz ID:', quizId);
  console.log('User ID:', userId);
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Quiz Title:', quizTitle);  // Log the quizTitle

  if (!score || !total || !duration || !quizId || !userId || !username || !email || !quizTitle) {  // Check quizTitle
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const newResult = new QuizResult({
      quizId,
      userId,
      username,
      email,
      score,
      total,
      duration,  // Include duration
      quizTitle,  // Include quizTitle
    });
    await newResult.save();
    res.status(201).json(newResult);
  } catch (err) {
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      error: err
    });
    res.status(500).send('Server Error');
  }
});


// Backend route for fetching user results
router.get('/user/results', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch results and populate quizId with Quiz data
    const results = await QuizResult.find({ userId }).populate('quizId');

    // Format the results
    const formattedResults = results.map(result => ({
      _id: result._id,
      quizTitle: result.quizTitle, // Retrieve quiz title
      attemptedDate: result.date, // Use the attemptedDate field from the result
      score: result.score, // Score obtained
      total: result.total, // Total points or maximum score
      duration: result.duration // Duration taken to complete the quiz
    }));

    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching results' });
  }
});



router.get('/creator/quizzes', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch quizzes created by the user
    const quizzes = await Quiz.find({ creatorId: userId }); // Assuming `creatorId` is the field for the creator

    // Fetch quiz results for those quizzes
    const quizResults = await QuizResult.find({ quizId: { $in: quizzes.map(quiz => quiz._id) } })
      .populate('userId', 'email') // Populate with email
      .populate('quizId'); // Populate quiz details

    // Format results to include quiz name and user details
    const formattedQuizzes = quizzes.map(quiz => {
      const results = quizResults.filter(result => result.quizId._id.toString() === quiz._id.toString());

      return {
        quizId: quiz._id,
        quizName: quiz.name,
        results: results.map(result => ({
          userId: result.userId._id,
          username: result.userId.username, // Assuming you have `username` in user model
          email: result.userId.email,
          score: result.score
        }))
      };
    });

    res.json(formattedQuizzes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quizzes and results' });
  }
});


export default router;
