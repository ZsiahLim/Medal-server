import { Schema, model } from "mongoose"
const BlogSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    status: {
        type: String,
        default: 'public'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likesUsers: {
        type: [String],
        default: []
    },
    dislikeUsers: {
        type: [String],
        default: []
    },
    favoriteUsers: {
        type: [String],
        default: []
    },
    blogType: {
        type: String
    },
    imgUrl: {
        type: [String],
        default: []
    },
    videoUrl: {
        type: String,
    },
    tags: {
        type: [String],
        default: []
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const BlogModel = model("blogs", BlogSchema)
export default BlogModel