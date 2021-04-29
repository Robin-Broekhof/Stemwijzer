const bigPartyThreshold = 5
const homepageDiv = document.getElementById("homepage-content")
const questionpageDiv = document.getElementById("questions-content")
const optionpageDiv = document.getElementById("options-content")
const resultpageDiv = document.getElementById("endresult-content")
const agreeButton = document.getElementById("btn-agree")
const noneButton = document.getElementById("btn-none")
const disagreeButton = document.getElementById("btn-disagree")
const skipButton = document.getElementById("btn-skip")
const questionBox = document.getElementById("questions-checkboxes")
const startButton = document.getElementById("start")
const bigPartyButton = document.getElementById("big-partie-box")
const secularPartyButton = document.getElementById("secular-partie-box")
const finalPageButton = document.getElementById("final-page-button")
const questionTitle = document.getElementById("question-title")
const questionElement = document.getElementById("question-element")
const backButton = document.getElementById("back")
var savedAnswers = []
var ExtraWeightedQuestions = []
var questioncounter = 0
var amountOfWeight = 30
var showBigParties = false
var showSecularParties = false
var partiesProCount = {}
for(i = 0; i < parties.length; i++){/** get every party name from json and set 0 as value */
    partiesProCount[parties[i].name] = 0;
}


function homepageDom(){        /** the js dom of the homepage page */
    revertDivDisplays("homepage")
    startButton.onclick = questionsDom
    revertClasses()
}
function questionsDom(){    /** the js dom of the questions page */
    revertDivDisplays("questionpage")
    agreeButton.onclick = function(){saveAnswer("pro")};
    noneButton.onclick = function(){saveAnswer("none")};
    disagreeButton.onclick = function(){saveAnswer("contra")};
    skipButton.onclick = function(){saveAnswer("skipped")};
    loadQuestions()
}
function OptionPageDom(){
    revertDivDisplays("optionpage")
    bigPartyButton.onclick = bigPartyStatus
    secularPartyButton.onclick = secularStatus
    finalPageButton.onclick = endResult
    for(i = 0; i < subjects.length; i++){
        var j = i + 1
        var questionsElement = document.createElement("label")
        questionsElement.innerText = j + ". " + subjects[i].title
        questionBox.appendChild(questionsElement)
        var questionCheckbox = document.createElement("input")
        questionCheckbox.type = "checkbox"
        questionCheckbox.id = "question" + i
        questionBox.appendChild(questionCheckbox);
        questionBox.appendChild(document.createElement("br"));
    }
}
function loadQuestions(){   /**loads in the question and keeps loading next question */
    questionTitle.innerText = subjects[questioncounter].title
    questionElement.innerText = subjects[questioncounter].statement
    backButton.onclick = questionBack
}
function saveAnswer(answer){   /**  saves the answer into a variable */
    revertClasses()
    savedAnswers[questioncounter] = answer
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
    revertDivDisplays("resultpage")
    calculateResults()
}
function bigPartyStatus() {
    var checkBox = bigPartyButton
    if (checkBox.checked == true){
      showBigParties = true
    } 
    else {
       showBigParties = false
    }
}
function secularStatus() {
    var checkBox = secularPartyButton
    if (checkBox.checked == true){
        showSecularParties = true
    } 
    else {
        showSecularParties = false
    }
}
function calculateResults(){    /** calculate for each party how much you have scored */
    var questionCheck = 0
    for(i = 0; i < subjects.length; i++){
        var questions = document.getElementById("question" + i)
        if (questions.checked == true){
            ExtraWeightedQuestions.push(i)
        }
    }
    subjects.forEach(subject => {
        if(questionCheck == ExtraWeightedQuestions[questionCheck]){
        subject.parties.forEach(parties => {
            if(savedAnswers[questionCheck] == parties.position){
                partiesProCount[parties.name]++
                partiesProCount[parties.name]++
            }
        })
        questionCheck++
    }
    else{
        subject.parties.forEach(parties => {
            if(savedAnswers[questionCheck] == parties.position){
                partiesProCount[parties.name]++
            }
        })
        questionCheck++
    }
    })
    showResults()
}
function showResults(){
    var int = 0;
    amountOfWeight = amountOfWeight + ExtraWeightedQuestions.length
    var partiesProCountSorted = Object.entries(partiesProCount).sort((a, b) => b[1] - a[1]).reduce((_sortedObj, [k,v]) => ({..._sortedObj, [k]: v}), {})
        
    for(var key in partiesProCountSorted){/** will print the results on the screen and will check if options were selected to show parties */
        var answerKey = partiesProCountSorted[key]
        var newAnswerKey = Math.round(answerKey / amountOfWeight * 100)
        if(showBigParties == true && showSecularParties == false){
            if(bigPartyThreshold <= parties[int].size ){
                createResultElements(1)
            }
            else{
                int++
            }
        }
        else if(showSecularParties == true && showBigParties == false){
            if(parties[int].secular == true){
                createResultElements(1)
            }
            else{
                int++
            }
        }
        else if(showSecularParties == true && showBigParties == true){
            if(parties[int].secular == true && bigPartyThreshold <= parties[int].size){
                createResultElements(1)
            }
            else{
                int++
            }
        }
        else if(showSecularParties == false && showBigParties == false){
            createResultElements(0)
        }
        function createResultElements(option){
            var resultElement = document.createElement("p")
            resultElement.innerText = key + ": " + newAnswerKey + "%"
            resultpageDiv.appendChild(resultElement);
            if(option == 1){
                int++
            }
        }
    }
}
function rememberQuestion(){    /** functionality of going back a page and the previous answers button is blue */
    var question = savedAnswers[questioncounter]
    revertClasses()
    if(question == "pro"){
        agreeButton.className = "blue-btn"
    }
    else if(question == "none"){
        noneButton.className = "blue-btn"
    }
    else if(question == "contra"){
        disagreeButton.className = "blue-btn"
    }
    else if(question == "skipped"){
        skipButton.className = "blue-btn"
    }
    loadQuestions()
}
function revertClasses(){   /** reverts buttons classes to none */
    agreeButton.className = ""
    noneButton.className = ""
    disagreeButton.className = ""
    skipButton.className = ""
}
function revertDivDisplays(page){
    homepageDiv.style.display = "none"
    questionpageDiv.style.display = "none"
    optionpageDiv.style.display = "none"
    resultpageDiv.style.display = "none"
    if(page == "homepage"){
        homepageDiv.style.display = ""
    }
    else if(page == "questionpage"){
        questionpageDiv.style.display = ""
    }
    else if(page == "optionpage"){
        optionpageDiv.style.display = ""
    }
    else if(page == "resultpage"){
        resultpageDiv.style.display = ""
    }
}
homepageDom()