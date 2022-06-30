const mainArea = document.querySelector(".main-area")
const deleteAllButton = document.querySelector(".main-area__delete__all__button")
const mainMessage = document.querySelector(".main-area__message")
const showAllText = document.querySelector(".expand__text__div");


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

        const textToSHow = text.texts.length > 50 ? `${text.texts.slice(0, 50)}...` : text.texts

        textSection.innerHTML = `
        <div class="message-div">
            <i class="fas fa-bullseye"></i>
            <h3>${text.title}</h3>
            <p>${textToSHow}</p>
        </div>
        <div class="control__buttons">
            <button class="delete__button">Delete</button>
        </div>
        <button class="read__more"> Read more</button>
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

const readMoreBtns = document.querySelectorAll(".read__more");

//deciding which note div should get the read more button. This is decided by the length of the texts from the user. if below 50 text length, read more button is uneccessary.

function getTextLength(){
    readMoreBtns.forEach((readMoreBtn, btnIndex)=>{
        let noReadMoreBtn = notepadTexts.filter((text, index)=>{
            if(btnIndex === index){
                return text.texts.length < 50
            }
        })
        
        if(noReadMoreBtn.length){
            readMoreBtn.style.display = "none"
        }
    })
}

getTextLength();

// initiating a variable to store new div element that will be created below. 
let showTextDiv;


//adding event listener to each read more button
readMoreBtns.forEach((readMoreBtn, btnIndex)=>{
    readMoreBtn.addEventListener("click", ()=>{
        let matched = notepadTexts.find((notepadText, index)=>{
            if(btnIndex === index){
                return notepadText
            }
        })
        if(matched){
            showTextDiv = document.createElement("div")
            showTextDiv.innerHTML = `
            <h3>${matched.title}</h3>
            <p>${matched.texts}</p>
            `
            showAllText.appendChild(showTextDiv)
            showAllText.style.display = "initial"
        }
    })
})


//closing the pop up text container with a click
const closeDivBtn = document.querySelector(".fa-times")

closeDivBtn.addEventListener("click", ()=>{
    showAllText.style.display = "none"

    //clearing all the texts in the container whenever the container is closed.
    showTextDiv.innerHTML = ""
})
