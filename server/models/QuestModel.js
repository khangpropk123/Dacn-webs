const mongoose = require('mongoose')

const questSchema = new mongoose.Schema({
    author: String,
    subject: String,
    question: String,
    level: Number,
    answers: [String],
    correct_answer: String,
})
module.exports = mongoose.model('Question', questSchema)
