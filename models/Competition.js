import { Schema, model } from "mongoose"
const CompetitionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    SignupPeriod: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        default: []
    },
    imgUrl: {
        type: [String],
        default: []
    },
    target: {
        type: [String],
    },
    rewardId: {
        type: String,
    }
}, { timestamps: true })

const CompetitionModel = model("Competitions", CompetitionSchema)
export default CompetitionModel