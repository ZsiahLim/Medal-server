import { Schema, model } from "mongoose"
const NotificationSchema = new Schema({
    userID: {
        type: String
    },
    type: {
        type: String
        // 系统消息， 举报反馈reportfeedback，被举报反馈reportedfeedback，代办 反馈的反馈feedbackFeedback
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    extra: {
        type: String
    },
    targetType: {
        type: String
    },
    targetID: {
        type: String
    },
    read: {
        type: Boolean,
        default: false,
    },
    systemNotification: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true })

const NotificationModel = model("Notification", NotificationSchema)
export default NotificationModel