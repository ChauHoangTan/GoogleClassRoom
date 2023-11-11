import express from "express";
import multer from "multer";
import uploadController from "../Controllers/UploadFile.js";

const UploadRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

UploadRouter.post("/", upload.single("file"), uploadController);

export default UploadRouter;
