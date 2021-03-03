var savedAnswers = []

var vraagcounter = 0
var vraagnummer = 2
console.log (subjects[vraagnummer].statement)
console.log (subjects[vraagnummer].parties[1].position)




function homepage(){
    document.getElementById("homepage-content").style.display = ""
    document.getElementById("onclick-button").style.display = ""
    document.getElementById("questions-content").style.display = "none"

    document.getElementById("start").onclick = questiondom
}

function questiondom(){
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = ""

    loadquestions()
}

function loadquestions(){

    document.getElementById("question-title").innerText = subjects[vraagcounter].title
    document.getElementById("question-element").innerText = subjects[vraagcounter].statement

    document.getElementById("btn-agree").onclick = function(){saveanswer("agree")};
    document.getElementById("btn-none").onclick = function(){saveanswer("none")};
    document.getElementById("btn-disagree").onclick = function(){saveanswer("disagree")};

}

function saveanswer(answer){
    savedAnswers[vraagcounter] = answer
    console.log(savedAnswers)




    vraagcounter++
    loadquestions()


}

















homepage()

