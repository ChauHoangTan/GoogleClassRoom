import express from "express";
import * as userController from "../Controllers/UserController.js";
import { verify } from "../Middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/profile", verify, userController.updateUserProfile);


export default router;
