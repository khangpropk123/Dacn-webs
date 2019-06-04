import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    email: String
})
export default mongoose.model('User', UserSchema)


