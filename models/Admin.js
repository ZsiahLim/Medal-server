import { Schema, model } from "mongoose"
const AdminSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    locale: {
        type: String,
        required: true,
        default: "en_US"
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

const AdminModel = model("admins", AdminSchema)
export default AdminModel