const express = require('express')
const multer = require('multer')
const { deleteFileByUrl, uploadController, uploadData } = require('../Controllers/UploadFile')

const UploadRouter = express.Router()

const upload = multer({
  storage: multer.memoryStorage()
})

UploadRouter.post('/', upload.single('file'), uploadController)

UploadRouter.delete('/', deleteFileByUrl)

UploadRouter.post('/data', upload.single('file'), uploadData)

module.exports = UploadRouter
