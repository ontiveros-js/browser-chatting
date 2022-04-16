import {Schema, model} from "mongoose"

const NoteSchema = new Schema({
    description: String,
    timeAgo: String,
    userName: String,
    update:{type: String, default: ""}
}, {
    timestamps: true
})

export default model("Note", NoteSchema)