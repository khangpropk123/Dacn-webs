import Question from "./QuestModel"
const mongoose = require('mongoose')
const ExamSchema = new mongoose.Schema({
    author_id : String,
    number_of_question: Number,
    exam_code: [String],
    questions : [Object],
    correct_answers : [String]

})
module.exports = mongoose.model('Exam', ExamSchema)