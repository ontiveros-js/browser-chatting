import {notesFromDB, loadNewNote} from "./socketFront.js"
import {onSubmit, renderTasks, renderTask, createEditUser} from "./ui.js"

notesFromDB(renderTasks)
loadNewNote(renderTask)


const $form = document.querySelector("#form")
const $btnUser = document.getElementById("btn-user")

$form.addEventListener("submit",  onSubmit)
$btnUser.addEventListener("click", createEditUser)

