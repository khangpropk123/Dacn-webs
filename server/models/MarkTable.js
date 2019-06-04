const mongoose = require('mongoose')
const MarkSchema = new mongoose.Schema({
    mssv: String,
    class: String,
    mark: Number,

})
module.exports = mongoose.model('MarkTable', MarkSchema)