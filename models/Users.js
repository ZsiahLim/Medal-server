import { Schema, model } from "mongoose"
const UserSchema = new Schema({
    avator: {
        type: String,
    },
    personalStatus: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    birthday: {
        type: String,
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    preferedTheme: {
        type: String,
        default: 'dark'
    },
    preferedLanguage: {
        type: String,
        required: true,
        default: 'en_US',
    },
    hpNum: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    fitnessLevel: {
        type: String
    },
    password: {
        type: String,
    },
    contactsUsers: {
        type: [String],
    },
    likeBlogs: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'blogs'
        }],
        default: []
    },
    favoriteBlogs: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'blogs'
        }],
        default: []
    },
    competitions: {
        type: [String],
        default: []
    },
    tutorialLibrary: {
        type: [String],
        default: []
    },
    medals: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        default: 'normal'
    },
    muteDate: {
        type: Date,
    },
    personalPrefer: {
        type: Object,
        default: {}
    },
    practicedTutorials: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'tutorials'
        }],
        default: []
    },
    favoriteTutorials: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'tutorials'
        }],
        default: []
    },
    sessions: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'sessions'
        }],
        default: []
    },
    // customize the notification tabs
    notificationTab: {
        type: {
            type: Schema.Types.ObjectId,
            ref: 'notificationTab'
        },
    },
    // boday measurements
    measurements: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'measurements'
        }]
    },
    records: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'records'
        }]
    },
    weightTarget: {
        type: Number,
    },
    stepTarget: {
        type: Number,
    },
    distanceTarget: {
        type: Number,
    },
    calorieTarget: {
        type: Number,
    },
    durationTarget: {
        type: Number,
    },

}, { timestamps: true })

const UserModel = model("users", UserSchema)
export default UserModel