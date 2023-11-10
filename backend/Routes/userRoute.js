import express from "express";
import * as userController from "../Controllers/UserController.js";

const router = express.Router();

router.post("/", userController.registerUser);

export default router;
