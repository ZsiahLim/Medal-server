import { Schema, model } from "mongoose"
const MedalSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
}, { timestamps: true })

const MedalModel = model("medals", MedalSchema)
export default MedalModel