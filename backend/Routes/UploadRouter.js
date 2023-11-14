import express from "express";
import multer from "multer";
import { deleteFileByUrl, uploadController } from "../Controllers/UploadFile.js";

const UploadRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

UploadRouter.post("/", upload.single("file"), uploadController);
UploadRouter.delete("/", deleteFileByUrl);

export default UploadRouter;
