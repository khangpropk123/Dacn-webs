import mongoose from 'mongoose'

const server = "mongodb://127.0.0.1:27017/"
const database = "mydb"

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(server + database, {useNewUrlParser: true})
            .then(() => {
                console.log("Database connect successful")
            })
            .catch((err) => {
                console.error('Database connect fail')
            })
    }


}

module.exports = new Database()