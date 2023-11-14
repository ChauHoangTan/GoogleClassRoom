const express = require("express");
const multer = require("multer");
const path = require("path");
const uuid = require("uuid");
const storage = require("../config/firebaseStorage.js");

const uuidv4 = uuid.v4;
const uploadController = async (req, res) => {
    try {
        // get file from request
        const file = req.file;
        // create new filename
        if(file) {
            const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

            const blob = storage.file(fileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
                metadata: {
                    contentType: file.mimetype,
                },
            });
            // if error
            blobStream.on("error", (error) => {
                res.status(400).json({ message: error.message });
            });
            // if success 
            blobStream.on("finish", () => {
                // get the public URL
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
                // return the file name and its public URL
                res.status(200).json(publicUrl);
            })
            blobStream.end(file.buffer);
            // when there is no file
        } else {
            res.status(400).json({ message: "Please upload a file" });
        }

    } catch (error) {
        res.send(400).json({ message: error.message });
    }
};

const deleteFileByUrl = async (req, res) => {
    try {
        const imageUrl = req.body.imageUrl;
                const parts = imageUrl.split("/");

        // Lấy phần tử cuối cùng của mảng (tức là tên tập tin)
        const part = parts[parts.length - 1];

        // Sử dụng substring để loại bỏ phần đuôi (?alt=media)
        const fileName = part.split("?")[0];
        const file = storage.file(fileName);

        // Check if the file exists
        const exists = await file.exists();
        if (exists[0]) {
            await file.delete();
            res.status(200).json({ imageUrl });

        } else {
            res.status(500).json(`File not found`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// export default uploadController;

module.exports = { uploadController, deleteFileByUrl}