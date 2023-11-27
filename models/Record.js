import { Schema, model } from "mongoose"
const RecordSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,// in sec
        default: 0,
        required: true,
    },
    calorieConsumption: {
        type: Number,
        default: 0,
        required: true,
    },
    steps: {
        type: Number,
        default: 0,
        required: true,
    },
    distance: {
        type: Number,//in km
        required: true
    },
    tutorialCalorieConsumption: {
        type: Number,
        default: 0,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
}, { timestamps: true })

const RecordModel = model("records", RecordSchema)
export default RecordModel