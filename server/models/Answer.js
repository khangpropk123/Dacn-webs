const mongoose = require('mongoose')
const AnswerSchema = new mongoose.Schema({
    exam_code : String,
    exam_id : String,
    answers: [String],
})
module.exports = mongoose.model('Answer', AnswerSchema)