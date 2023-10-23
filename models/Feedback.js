import { Schema, model } from "mongoose"
const FeedbackSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'waiting',
        required: true,
    },
    adminResponse: {
        type: String,
    },
    userID: {
        type: String,
        required: true
    }
}, { timestamps: true })

const FeedbackModel = model("feedbacks", FeedbackSchema)
export default FeedbackModel