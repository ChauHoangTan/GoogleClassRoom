require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRouter = require('./Routes/UserRoute')
const authRouter = require('./Routes/AuthRouter')
const UploadRouter = require('./Routes/UploadRouter')
const ClassRouter = require('./Routes/ClassRouter.js')
const GradeRouter = require('./Routes/GradeRouter.js')
var cookieParser = require('cookie-parser')
// eslint-disable-next-line no-unused-vars
const errorHandler = require('./Middlewares/errorMiddleware.js')
const socketServer = require('./socketServer.js')

const app = express()
app.use(express.json())
// app.use(cors());
app.use(cors({
  origin: [process.env.CLIENT_URL, 'https://accounts.google.com/', 'http://localhost:5000'],
  credentials: true
}))

// Socket.IO configuration
const server = require('http').createServer(app)
socketServer.registerSocketServer(server)

app.set('trust proxy', 1)

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
// connect database
connectDB()

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/upload', UploadRouter)
app.use('/api/class', ClassRouter)
app.use('/api/grade', GradeRouter)

// error handling middleware
// app.use(errorHandler);

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running in http://localhost:${PORT}`)
})
