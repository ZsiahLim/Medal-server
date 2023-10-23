import { Schema, model } from "mongoose"
const MessageSchema = new Schema({
    conversationId: {
        type: String,
        required: true
    },
    msgType: {
        type: String,
        default: 'text',
    },
    receiver: {
        type: String,
    },
    sender: {
        type: String
    },
    readed: {
        type: Boolean,
        default: false
    },
    msgValue: {
        type: String
    },
    msgWidth: {
        type: Number
    },
    msgHeight: {
        type: Number
    }
}, { timestamps: true })

const MessageModel = model("Message", MessageSchema)
export default MessageModel