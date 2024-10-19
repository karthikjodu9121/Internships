import mongoose from 'mongoose';

const QuizResultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  duration: {  // Added duration field
    type: Number,
    required: true,
  },
  quizTitle: {  // Added quizTitle field
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const QuizResult = mongoose.model('QuizResult', QuizResultSchema);

export default QuizResult;
