require("dotenv").config();
const express = require("express");
const cors = require("cors");
const  connectDB  = require("./config/db")
const userRouter = require("./Routes/UserRoute")
const UploadRouter = require("./Routes/UploadRouter")
var cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser())
// app.use(cors());
app.use(cors({
    origin: process.env.CLIENT_URL
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// connect database
connectDB();

app.get('/', (req, res) => {
    res.send("Hello world");
})

app.use("/api/users", userRouter);
app.use("/api/upload", UploadRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})