import {creatNote, deleteNote, editNote, notesFromDB} from "./socketFront.js"

const $divPricipal = document.getElementById("div")
const $h1User = document.getElementById("user")
const $inputUser = document.getElementById("userInput")

//TODO EL SCROLL ABAJO PARA VER EL ULTIMO MSG

setTimeout(()=>{
    $divPricipal.scrollTo(0, 100000)
}, 100)

//GUARDANDO EL NOMBRE DEL USUARIO EN LOCALSTOTAGE
let localS = localStorage.getItem("user")

if(localS){
    $h1User.textContent = localS
}else{
    localStorage.setItem("user", "Anonymous")
    $h1User.textContent = "Anonymous"
}

// GUARDANDO LOS NOMBRES ANTERIORES DEL USUARIO EN LOCALSTORAGE
let getPrevious = localStorage.getItem("previousUseName")
let previousStorage

if(getPrevious){
    previousStorage = JSON.parse(localStorage.getItem("previousUseName"))
}else{
    localStorage.setItem("previousUseName", JSON.stringify([]))
    previousStorage= []
}

export const onSubmit = (e) => {
    e.preventDefault()
    if(e.target.hidden.value){
        editNote(e.target.hidden.value, e.target.description.value )
    }else{
        
        creatNote(e.target.description.value, $h1User.textContent)
        setTimeout(() => {
            $divPricipal.scrollTo(0, 100000000)

        }, 100)
    }

    e.target.description.value = ""
    e.target.hidden.value= ""
    e.target.description.focus()

}


export const structure = (data) => {
    const div = document.createElement("div")
    div.className = "div-padre"

    let You
    let disabled 
    let color = ""
    let triangleChat= ""
    let colorName= ""
    let edited = ""
    let bg = ""

    if(localStorage.getItem("user") === data.userName){
        You = "You"
        colorName = "color"
        div.style.alignItems = "flex-end"
        div.style.marginRight = "20px"
        if(data.update) edited= "Edited"
    }else if(previousStorage.includes(data.userName)){
        You = "You"
        colorName= "color"
        div.style.alignItems = "flex-end"
        div.style.marginRight = "20px"
    }else{
        You = ""
        disabled = "disabled"
        color = "color"
        bg = "isgrey"
        triangleChat = "div-padre__div-card-"
        div.style.marginLeft = "20px"
    }

    if(data.userName){
        div.innerHTML = `
            <div class="div-padre__div-card ${triangleChat} ${bg}">
                <h3 class="div-padre__h3 ${colorName}"><small>${data.userName}</small>:</h3>
                <h2>${data.description}</h2>
                <input type="hidden">
                <small>${data.timeAgo} ${You}</small><br> 
                <small>${edited} ${data.update}</small>     
            </div>
            <div class="div-padre__div-btn">
                <button class="btnEdit ${color}" ${disabled} data-id=${data._id}>Edit</button>
                <button class="btnDelete ${color}" ${disabled} data-id=${data._id}>Delete</button>
            </div>
        `
        div.classList.replace("div-padre__div-card::before", "div-padre__div-card-::before")
        const btnEdit = div.querySelector(".btnEdit")
        const btnDelete = div.querySelector(".btnDelete")
    
        btnDelete.addEventListener("click", (e) => {
            deleteNote(btnDelete.dataset.id)
    
        })
    
        btnEdit.addEventListener("click" , (e) => {
            document.getElementById("form").description.value = data.description
            document.getElementById("form").description.focus()
            document.getElementById("form").hidden.value = btnEdit.dataset.id
        })
    
        return div


    }else{

        div.innerHTML = `
            <div class="div-padre__div-card-nameChanged">
                <small>${data.description}</small>
                <small>${data.timeAgo}</small>
            </div>
        `

        return div

    }


}

export const renderTasks = (notes) => {
    
    $divPricipal.innerHTML= ""
    notes.forEach(note => $divPricipal.appendChild(structure(note)))

}

export const renderTask = (note) => {
    $divPricipal.appendChild(structure(note))

}

export const createEditUser = (e) => {

    if(e.target.textContent === "Edit"){
        $inputUser.classList.toggle("userInput")
        $inputUser.value = $h1User.textContent
        $inputUser.focus()
        $h1User.classList.toggle("h1user")
        e.target.textContent = "Save"

    }else{
        let previousValue = $h1User.textContent
        let value = $inputUser.value.trim()
        localStorage.setItem("user", value)
        $h1User.textContent = value
        previousStorage.push(value)
        localStorage.setItem("previousUseName", JSON.stringify(previousStorage))
        creatNote(`<b>${previousValue}</b> changed the name to <b>${value}</b>`)
        $inputUser.classList.toggle("userInput")
        $h1User.classList.toggle("h1user")
        e.target.textContent = "Edit"
    }
}