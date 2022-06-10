const mainArea = document.querySelector(".main-area")
const deleteAllButton = document.querySelector(".main-area__delete__all__button")
const mainMessage = document.querySelector(".main-area__message")

let notepadTexts = JSON.parse(localStorage.getItem("input")) || []

if(notepadTexts.length !== 0){
    mainMessage.style.display = "none"
}

function displayNotepadHistory(){
    for(let text of notepadTexts){
        let textSection = document.createElement("section")
        textSection.style.display = "flex"
        textSection.style.flexDirection = "column"
        textSection.style.justifyContent = "center"
        textSection.style.marginTop = "1em"
        textSection.style.backgroundColor = "lightgreen"
        textSection.style.borderRadius = "10px"
        textSection.style.width = "95%"
        textSection.style.position = "relative"
        textSection.style.marginBottom = "1em"
        textSection.innerHTML = `
        <div class="message-div">
            <i class="fas fa-bullseye"></i>
            <h3>${text.title}</h3>
            <p>${text.texts}</p>
        </div>
        <div class="control__buttons">
            <button class="delete__button">Delete</button>
        </div>
        `

        mainArea.appendChild(textSection)
    }
}

displayNotepadHistory()

const deletButtons = document.querySelectorAll('.delete__button')

deletButtons.forEach((deleteButton, buttonIndex)=>{
    let newArray = []
    deleteButton.addEventListener("click", ()=>{
        let unmatched = notepadTexts.filter((Text, Textindex)=>{
            if(buttonIndex !== Textindex){
                return Text
            }
        })
        if(unmatched.length === 0){
            localStorage.removeItem("input");
            location.reload()
            return
        }
        for(let text of unmatched){
            let updated = {
                texts: text.texts,
                title: text.title
            }
            newArray.push(updated)
            localStorage.setItem("input", JSON.stringify(newArray))
            location.reload()
        }
    })
})

if(notepadTexts.length < 2){
    deleteAllButton.style.display = "none"
}

deleteAllButton.addEventListener("click", ()=>{
    localStorage.removeItem("input")
    location.reload()
})
