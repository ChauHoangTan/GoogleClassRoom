import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

// connect database
connectDB();

app.get('/', (req, res) => {
    res.send("Hello world");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})