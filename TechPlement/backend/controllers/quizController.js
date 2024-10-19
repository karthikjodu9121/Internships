const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions');
        res.status(200).send(quizzes);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz) return res.status(404).send();
        res.status(200).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!quiz) return res.status(404).send();
        res.status(200).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).send();
        res.status(200).send(quiz);
    } catch (error) {
        res.status(400).send(error);
    }
};
