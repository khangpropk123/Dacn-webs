import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Routers from './server/routes/Routers'
import cors from 'cors'

const router = express.Router()
const path = __dirname
//Cors
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
//Express
const app = express()
const PORT = 8888 //Local Config PORT
const IP_ADDRESS = '192.168.0.42'
app.listen(PORT,() => console.log(`Server is listening with ${IP_ADDRESS}:${PORT}`))
// Set App Express
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('server/public'))
app.use(express.static('server/uploads'))
app.set('view engine', 'ejs')
app.set('views', './server/views')

Routers(app, path)






