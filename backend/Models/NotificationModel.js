const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Notification", NotificationSchema);  