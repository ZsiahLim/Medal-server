import { Schema, model } from "mongoose"
const MusicSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
    }
}, { timestamps: true })

const MusicModel = model("musics", MusicSchema)
export default MusicModel