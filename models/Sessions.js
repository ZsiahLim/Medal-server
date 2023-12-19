import { Schema, model } from "mongoose"
const SessionSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    tutorial: {
        type: Schema.Types.ObjectId,
        ref: 'tutorials',
    },
    otherTypeTutorial: {
        type: Object,
        default: {},
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    exerciseDuration: {
        type: Number,
        // 单位为秒
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    },
    calorieConsumption: {
        type: Number,
    },
    step: {
        type: Number,
    },
    distance: {
        type: Number,
    }
}, { timestamps: true })

const SessionModel = model("sessions", SessionSchema)
export default SessionModel