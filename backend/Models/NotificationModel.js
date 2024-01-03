const mongoose = require('mongoose')

const NotificationSchema = mongoose.Schema(
  {
    userSendId: {
      type: String,
      default: '',
      trim: true
    },
    userReceiverId: {
      type: String,
      default: '',
      trim: true
    },
    userName: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    read: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Notification', NotificationSchema)