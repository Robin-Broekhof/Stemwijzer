var savedAnswers = []
var vraagcounter = 0




function homepage(){        /** the js dom of the homepage page */
    document.getElementById("homepage-content").style.display = ""
    document.getElementById("onclick-button").style.display = ""
    document.getElementById("questions-content").style.display = "none"

    document.getElementById("start").onclick = questionsdom

    revertClasses()
}

function questionsdom(){    /** the js dom of the questions page */
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = ""

    loadquestions()
}

function loadquestions(){   /**loads in the question and keeps loading next question */
    document.getElementById("question-title").innerText = subjects[vraagcounter].title
    document.getElementById("question-element").innerText = subjects[vraagcounter].statement


    document.getElementById("btn-agree").onclick = function(){saveanswer("pro")};
    document.getElementById("btn-none").onclick = function(){saveanswer("none")};
    document.getElementById("btn-disagree").onclick = function(){saveanswer("contra")};
    document.getElementById("btn-skip").onclick = function(){saveanswer("skipped")};

    document.getElementById("back").onclick = questionback
}

function saveanswer(answer){   /**  saves the answer into a variable */


    
    revertClasses()

    savedAnswers[vraagcounter] = answer
    console.log(savedAnswers)
    vraagcounter++
    if(subjects.length == savedAnswers.length){
        endresult()
    }
    else{
        loadquestions()
    }
}

function endresult(){
    document.getElementById("homepage-content").style.display = "none"
    document.getElementById("onclick-button").style.display = "none"
    document.getElementById("questions-content").style.display = "none"
    alert("je bent klaar")
}


function questionback(){    /** functionality of the back button */
    if(vraagcounter === 0){
        homepage()
    }
    else{
        vraagcounter--
        rememberQuestion()
    }
}

function rememberQuestion(){
        var question = savedAnswers[vraagcounter]
        
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





/**
console.log (subjects[vraagnummer].parties[1].position)
 */







questionsdom()
/** 
homepage()
*/