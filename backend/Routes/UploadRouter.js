const express = require("express");
const multer = require("multer");
const { deleteFileByUrl, uploadController } = require("../Controllers/UploadFile.js");

const UploadRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

UploadRouter.post("/", upload.single("file"), uploadController);
UploadRouter.delete("/", deleteFileByUrl);

module.exports = UploadRouter;
