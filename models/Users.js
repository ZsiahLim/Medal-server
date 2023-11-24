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
        type: [String],
    },
    favoriteBlogs: {
        type: [String],
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
    weightTarget: {
        type: Number,
    }

}, { timestamps: true })

const UserModel = model("users", UserSchema)
export default UserModel