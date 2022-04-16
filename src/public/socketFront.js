const socket = io()

export const notesFromDB = (callback) => {
    socket.on("notesFromDB", callback)
}


export const creatNote = ( description, userName) => {
    socket.emit("createNote", {description, userName})
}

export const  loadNewNote = (callback) => {
    socket.on("noteLoaded", callback)
}

export const deleteNote = (id) => {
    socket.emit("deleteNote", id)
}

export const editNote = (id, description) => {
    socket.emit("editNote", {id, description})
}