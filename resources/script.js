let savedAnswers = []


let fruit = [
    {
        "name": "appel"
    },
    {
        "name": "banaan"
    }
];



function homepage(){
    document.getElementById("homepage-content").style.display = ""
    document.getElementById("onclick-button").style.display = ""
    document.getElementById("questions-content").style.display = "none"


    document.getElementById("start").onclick = questionsPage



    
}

function questionsPage(){
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = ""

    document.getElementById("title").innerText = fruit.name[0]
}



















homepage()

