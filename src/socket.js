import Notes from "./models/Notes"
import {format} from "timeago.js"


export const socket = (io) => {

    io.on("connection", (connect) => {

        const getNotes = async () => {

           try {

                const notesDB = await Notes.find()

                const notes = notesDB.map(note => {
                    note.timeAgo = format(note.createdAt)

                    if(note.updatedAt.toTimeString() !== note.createdAt.toTimeString()){
                        note.update = format(note.updatedAt)
                    } 

                    return note

                 })

                io.emit("notesFromDB", notes)

            }catch (error) {
                console.log(error, "aqui esta el error notesFromDB*******")
                }

        }

        getNotes()

        connect.on("createNote", async (data) => {
            try {
                const newNote = new Notes(data)
                newNote.timeAgo = format()
                await newNote.save()
                io.emit("noteLoaded" , newNote)

            } catch (error) {
                console.log(error._message, "aqui esta el error noteLoaded********")
            }

        })

        connect.on("deleteNote", async (id) => {

            try {
                await Notes.findByIdAndDelete(id)
                getNotes()


            } catch (error) {
                console.log(error, "aqui esta el error deleteNote*******")

            }
        })


        connect.on("editNote", async (data) => {
            try {
                 const {id , description } = data
                 await Notes.findByIdAndUpdate(id, { description})
                 getNotes()
            } catch (error) {
                console.log(error, "aqui esta el error editNote********")
            }
        })
    })
}