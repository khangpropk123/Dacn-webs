const mongoose = require('mongoose')
const StudentListSchema = new mongoose.Schema({
    name: String,
    mssv: String,
    class: String,
    mark: Number,
    student_answers: String,
    exam_answers: String,

})
module.exports = mongoose.model('StudentList', StudentListSchema)