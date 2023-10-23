import { Schema, model } from "mongoose"
const TutorialSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    zh_name: {
        type: String,
        required: true,
    },
    brief: {
        type: String,
        required: true,
    },
    zh_brief: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    zh_description: {
        type: String,
        required: true,
    },
    lowerEstimateColorie: {
        type: Number,
        required: true,
    },
    higherEstimateColorie: {
        type: Number,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    equipments: {
        type: [String],
        default: []
    },
    cover: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    users: {
        type: [String],
        default: []
    },
    rate: {
        type: [Number],
        default: []
    }
}, { timestamps: true })

const TutorialModel = model("tutorials", TutorialSchema)
export default TutorialModel