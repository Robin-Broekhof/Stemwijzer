var savedAnswers = []
var questioncounter = 0
/**
console.log (subjects[vraagnummer].parties[1].position)
 */

var partiesProCount = { 
    "VVD": 0,                   "CDA": 0,                       "PVV": 0, 
    "D66": 0,                   "GroenLinks": 0,                "SP": 0, 
    "PvdA": 0,                  "ChristenUnie": 0,              "Partij voor de Dieren": 0, 
    "SGP": 0,                   "DENK": 0,                      "Forum voor Democratie": 0, 
    "Lokaal in de Kamer": 0,    "OndernemersPartij": 0,         "VNL": 0, 
    "Nieuwe Wegen": 0,          "De Burger Beweging": 0,        "Piratenpartij": 0, 
    "Artikel 1": 0,             "Libertarische Partij": 0,      "50Plus": 0,
    "Vrijzinnige Partij": 0,    "Niet Stemmers": 0 
};


var page = 1




function homepagedom(){        /** the js dom of the homepage page */
    document.getElementById("homepage-content").style.display = ""
    document.getElementById("onclick-button").style.display = ""
    document.getElementById("questions-content").style.display = "none"
    document.getElementById("endresult-content").style.display = "none"

    document.getElementById("start").onclick = questionsdom

    revertClasses()
}
function questionsdom(){    /** the js dom of the questions page */
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = ""
    document.getElementById("endresult-content").style.display = "none"

    loadquestions()
}
function endresultdom(){
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = "none"
    document.getElementById("endresult-content").style.display = ""
}






function loadquestions(){   /**loads in the question and keeps loading next question */
    document.getElementById("question-title").innerText = subjects[questioncounter].title
    document.getElementById("question-element").innerText = subjects[questioncounter].statement

    document.getElementById("btn-agree").onclick = function(){saveanswer("pro")};
    document.getElementById("btn-none").onclick = function(){saveanswer("none")};
    document.getElementById("btn-disagree").onclick = function(){saveanswer("contra")};
    document.getElementById("btn-skip").onclick = function(){saveanswer("skipped")};

    document.getElementById("back").onclick = questionback
}

function saveanswer(answer){   /**  saves the answer into a variable */
    revertClasses()
    savedAnswers[questioncounter] = answer
    console.log(savedAnswers)
    questioncounter++
    if(subjects.length == savedAnswers.length){
        endresult()
    }
    else{
        loadquestions()
    }
}

function questionback(){    /** functionality of the back button */
    if(questioncounter === 0){
        homepagedom()
    }
    else{
        questioncounter--
        rememberQuestion()
    }
}

function endresult(){
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = "none"
    alert("je bent klaar")
    calculateResults()
}

function calculateResults(){
    var questionCheck = 0
    subjects.forEach(subject => {
        subject.parties.forEach(partie => {
            if(savedAnswers[questionCheck] == partie.position){
                partiesProCount[partie.name]++
            }
        })
        questionCheck++
    })
    console.log(partiesProCount)
    document.getElementById("all-parties").innerText = partiesProCount[0,1]
}
























function rememberQuestion(){    /** functionality of going back a page and the previous answers button is blue */
    var question = savedAnswers[questioncounter]
    
    if(question == "pro"){
        document.getElementById("btn-agree").className = "blue-btn"
        document.getElementById("btn-none").className = ""
        document.getElementById("btn-disagree").className = ""
        document.getElementById("btn-skip").className = ""
    }
    if(question == "none"){
        document.getElementById("btn-agree").className = ""
        document.getElementById("btn-none").className = "blue-btn"
        document.getElementById("btn-disagree").className = ""
        document.getElementById("btn-skip").className = ""
    }
    if(question == "contra"){
        document.getElementById("btn-agree").className = ""
        document.getElementById("btn-none").className = ""
        document.getElementById("btn-disagree").className = "blue-btn"
        document.getElementById("btn-skip").className = ""
    }
    if(question == "skipped"){
        document.getElementById("btn-agree").className = ""
        document.getElementById("btn-none").className = ""
        document.getElementById("btn-disagree").className = ""
        document.getElementById("btn-skip").className = "blue-btn"
    }
    loadquestions()
}
function revertClasses(){
document.getElementById("btn-agree").className = ""
document.getElementById("btn-none").className = ""
document.getElementById("btn-disagree").className = ""
document.getElementById("btn-skip").className = ""
}

homepagedom()