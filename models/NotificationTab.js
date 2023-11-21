import { Schema, model } from "mongoose"
const NotificationTabSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    systemMsgsTabShow: {
        type: Boolean,
        default: true
    },
    messagesTabShow: {
        type: Boolean,
        default: true
    },
    todosTabShow: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

const NotificationTabModel = model("notificationTab", NotificationTabSchema)
export default NotificationTabModel