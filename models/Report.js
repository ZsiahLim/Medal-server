import { Schema, model } from "mongoose"
const ReportSchema = new Schema({
    type: {
        type: String,
        required: true
    },

    targetID: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    adminResponse: {
        type: String,
    },
    status: {
        type: String,
        default: 'waiting',
        // required: true,
    },
    userID: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ReportModel = model("reports", ReportSchema)
export default ReportModel