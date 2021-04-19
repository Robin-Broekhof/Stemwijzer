var savedAnswers = []
var questioncounter = 0
var loopbreaker = 0
var partiesProCount = {}
var showBigParties = false
var showSecularParties = false
const bigPartyThreshold = 1

for(i = 0; i < parties.length; i++){
    partiesProCount[parties[i].name] = 0;
}

/**
console.log (subjects[vraagnummer].parties[1].position)
var partyList = parties[0].name
 */





function homepageDom(){        /** the js dom of the homepage page */
    document.getElementById("homepage-content").style.display = ""
    document.getElementById("onclick-button").style.display = ""
    document.getElementById("questions-content").style.display = "none"
    document.getElementById("options-page").style.display = "none"
    document.getElementById("endresult-content").style.display = "none"
        document.getElementById("start").onclick = questionsDom
        revertClasses()
}

function questionsDom(){    /** the js dom of the questions page */
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = ""
    document.getElementById("options-page").style.display = "none"
    document.getElementById("endresult-content").style.display = "none"
        document.getElementById("btn-agree").onclick = function(){saveAnswer("pro")};
        document.getElementById("btn-none").onclick = function(){saveAnswer("none")};
        document.getElementById("btn-disagree").onclick = function(){saveAnswer("contra")};
        document.getElementById("btn-skip").onclick = function(){saveAnswer("skipped")};
        loadQuestions()
}

function OptionPageDom(){
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = "none"
    document.getElementById("options-page").style.display = ""
    document.getElementById("endresult-content").style.display = "none"
        document.getElementById("big-partie-box").onclick = bigPartyStatus
        document.getElementById("secular-partie-box").onclick = secularStatus

        
    
}

function endresultDom(){
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = "none"
    document.getElementById("options-page").style.display = "none"
    document.getElementById("endresult-content").style.display = ""
}

function bigPartyStatus() {
    var checkBox = document.getElementById("big-partie-box");
    if (checkBox.checked == true){
      ShowBigParties = true
    } 
    else {
       ShowBigParties = false
    }
}
function secularStatus() {
    var checkBox = document.getElementById("secular-partie-box");
    if (checkBox.checked == true){
        showSecularParties = true
    } 
    else {
        showSecularParties = false
    }
}







function loadQuestions(){   /**loads in the question and keeps loading next question */
    document.getElementById("question-title").innerText = subjects[questioncounter].title
    document.getElementById("question-element").innerText = subjects[questioncounter].statement
        document.getElementById("back").onclick = questionBack
}

function saveAnswer(answer){   /**  saves the answer into a variable */
    revertClasses()
    savedAnswers[questioncounter] = answer
    console.log(savedAnswers)
    questioncounter++
    if(subjects.length == savedAnswers.length){
        OptionPageDom()
    }
    else{
        loadQuestions()
    }
}

function questionBack(){    /** functionality of the back button */
    if(questioncounter === 0){
        homepageDom()
    }
    else{
        questioncounter--
        rememberQuestion()
    }
}

function endResult(){       /**show result after all questions has been answered */
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = "none"
        endresultDom()
        calculateResults()
}

function calculateResults(){    /** calculate for each party how much you have scored */
    var questionCheck = 0
    subjects.forEach(subject => {
        subject.parties.forEach(parties => {
            if(savedAnswers[questionCheck] == parties.position){
                partiesProCount[parties.name]++
            }
        })
        questionCheck++
    })


    console.log(ShowBigParties)

    
    
    

    for(var key in partiesProCount){

        /*      only shows 3 results
        if(loopbreaker == 3){
            break
        }
       */
    
            var resultElement = document.createElement("p")
            resultElement.innerText = key + ": " + partiesProCount[key]
            document.getElementById("endresult-content").appendChild(resultElement);
      

        
    }
    
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
    loadQuestions()
}
function revertClasses(){   /** reverts buttons classes to none */
    document.getElementById("btn-agree").className = ""
    document.getElementById("btn-none").className = ""
    document.getElementById("btn-disagree").className = ""
    document.getElementById("btn-skip").className = ""
}

homepageDom()