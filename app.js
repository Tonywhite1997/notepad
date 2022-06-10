const textfield = document.querySelector(".main-area__section__textfield")
const titleField = document.querySelector(".main-area__section__title__field")
const saveButton = document.querySelector(".main-area__section__button")
const mainAreaHeading = document.querySelector(".main-area__section__h2")

titleField.addEventListener("input", ()=>{
    if(textfield.length !== 0){
        mainAreaHeading.style.animation = "none"
    }
})


function saveTextsToLocalStorage(texts, title){
    title = titleField.value
    texts = textfield.value
    let message = {
        title,
        texts
    }

    if(!title && !texts){
        return alert("nothing to save!")
    }

    if(!title){
        return alert("include a title to continue")
    }

    if(!texts){
        return
    }
    if(texts[0] === " "){
        return alert("Do not start your message with a space.")
    }

    let textArray = JSON.parse(localStorage.getItem("input")) || []
    textArray.push(message)
    localStorage.setItem("input", JSON.stringify(textArray))
    alert("successfully saved to library..")
    location.reload()
}

saveButton.addEventListener("click", saveTextsToLocalStorage)
