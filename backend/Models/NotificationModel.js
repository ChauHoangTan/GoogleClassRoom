const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
    {
        socketId: {
            type: String,
            default: "",
        },
        firstName: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Notification", NotificationSchema);  