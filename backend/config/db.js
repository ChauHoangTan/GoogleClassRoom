/* eslint-disable no-console */
const mongoose = require('mongoose')

const connectDB = async() => {
  try {
    // eslint-disable-next-line no-unused-vars
    const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB Connected')
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}
module.exports = connectDB