import { Schema, model } from "mongoose"
const ConversationSchema = new Schema({
    members: {
        type: Array,
        required: true
    },
    lastWords: {
        type: String,
        default: ''
    },
    lastWordType: {
        type: String,
        default: 'text'
    },
}, { timestamps: true })

const ConversationModel = model("Conversation", ConversationSchema)
export default ConversationModel