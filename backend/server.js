const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const  connectDB  = require("./config/db")
const userRouter = require("./Routes/UserRoute")
const UploadRouter = require("./Routes/UploadRouter")

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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