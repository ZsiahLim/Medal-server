import { Schema, model } from "mongoose"
const MeasurementSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    weight: {
        type: Number,// in kg
        required: true,
    },
    height: {
        type: Number,// in cm
        required: true,
    },
    bodyFatRate: {
        type: Number,
    },
    BMI: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
}, { timestamps: true })

const MeasurementModel = model("measurements", MeasurementSchema)
export default MeasurementModel