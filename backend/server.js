require("dotenv").config();
const express = require("express");
const cors = require("cors");
const  connectDB  = require("./config/db")
const userRouter = require("./Routes/UserRoute")
const authRouter = require("./Routes/AuthRouter")
const UploadRouter = require("./Routes/UploadRouter")
var cookieParser = require('cookie-parser')
const errorHandler  = require('./Middlewares/errorMiddleware.js');

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: [process.env.CLIENT_URL, "https://accounts.google.com/"],
    credentials: true
}))

app.set("trust proxy", 1);

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));
// connect database
connectDB();

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/upload", UploadRouter);

// error handling middleware
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})