// eslint-disable-next-line no-unused-vars
const express = require('express')
// eslint-disable-next-line no-unused-vars
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
const storage = require('../config/firebaseStorage')
const UserModel = require('../Models/UserModel')
const ClassModel = require('../Models/ClassModel')
const GradeModel = require('../Models/GradeModel')
const NotificationModel = require('../Models/NotificationModel')

const uuidv4 = uuid.v4
const uploadController = async (req, res) => {
  try {
    // get file from request
    const file = req.file
    // create new filename
    if (file) {
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        return res.status(400).json({ message: 'File format is incorrect.' })
      }
      if (file.size > 1024 * 1024) {
        return res.status(400).json({ message: 'Size too large (must under 1mb).' })
      } // 1mb

      const fileName = `${uuidv4()}${path.extname(file.originalname)}`

      const blob = storage.file(fileName)
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: file.mimetype
        }
      })
      // if error
      blobStream.on('error', (error) => {
        res.status(400).json({ message: error.message })
      })
      // if success
      blobStream.on('finish', () => {
        // get the public URL
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`
        // return the file name and its public URL
        res.status(200).json(publicUrl)
      })
      blobStream.end(file.buffer)
      // when there is no file
    } else {
      res.status(400).json({ message: 'Please upload a file' })
    }

  } catch (error) {
    res.send(400).json({ message: error.message })
  }
}

const deleteFileByUrl = async (req, res) => {
  try {
    const imageUrl = req.body.imageUrl
    const parts = imageUrl.split('/')

    // Lấy phần tử cuối cùng của mảng (tức là tên tập tin)
    const part = parts[parts.length - 1]

    // Sử dụng substring để loại bỏ phần đuôi (?alt=media)
    const fileName = part.split('?')[0]
    const file = storage.file(fileName)

    // Check if the file exists
    const exists = await file.exists()
    if (exists[0]) {
      await file.delete()
      res.status(200).json({ imageUrl })

    } else {
      res.status(500).json('File not found')
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const uploadData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const fileBuffer = req.file.buffer
    const jsonData = JSON.parse(fileBuffer.toString('utf-8'))

    // Chèn dữ liệu vào MongoDB sử dụng các mô hình đã định nghĩa
    await Promise.all([
      ...jsonData.users.map(async (user) => {
        const existingUser = await UserModel.findOne({ /* your conditions to match existing user */ })
        if (!existingUser) {
          await UserModel.create(user)
        }
      }),
      ...jsonData.classes.map(async (classData) => {
        const existingClass = await ClassModel.findOne({ /* your conditions to match existing class */ })
        if (!existingClass) {
          await ClassModel.create(classData)
        }
      }),
      ...jsonData.grades.map(async (grade) => {
        const existingGrade = await GradeModel.findOne({ /* your conditions to match existing grade */ })
        if (!existingGrade) {
          await GradeModel.create(grade)
        }
      }),
      ...jsonData.notifications.map(async (notification) => {
        const existingNotification = await NotificationModel.findOne({ /* your conditions to match existing notification */ })
        if (!existingNotification) {
          await NotificationModel.create(notification)
        }
      })
    ])

    return res.json({ message: 'Import successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'Error processing the uploaded file' })
  }
}


// export default uploadController;

module.exports = { uploadController, deleteFileByUrl, uploadData }