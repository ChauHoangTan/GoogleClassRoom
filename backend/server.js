import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from './Routes/UserRoute.js';
import UploadRouter from './Routes/UploadRouter.js';

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