var savedAnswers = []
var vraagcounter = 0




function homepage(){        /** the js dom of the homepage page */
    document.getElementById("homepage-content").style.display = ""
    document.getElementById("onclick-button").style.display = ""
    document.getElementById("questions-content").style.display = "none"

    document.getElementById("start").onclick = questionsdom
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

    document.getElementById("btn-agree").onclick = function(){saveanswer("agree")};
    document.getElementById("btn-none").onclick = function(){saveanswer("none")};
    document.getElementById("btn-disagree").onclick = function(){saveanswer("disagree")};
    document.getElementById("btn-skip").onclick = function(){saveanswer("skipped")};

    document.getElementById("back").onclick = questionback
}

function saveanswer(answer){   /**  saves the answer into a variable */
    savedAnswers[vraagcounter] = answer
    console.log(savedAnswers)
    console.log (subjects.length)


    vraagcounter++

    if(subjects.length == savedAnswers.length){
        alert("je bent klaar")
        /** !!!!nieuwe functie voor dom en end pagina !!!!*/
        document.getElementById("homepage-content").style.display = "none"
        document.getElementById("onclick-button").style.display = "none"
        document.getElementById("questions-content").style.display = "none"
    }
    else{
        loadquestions()
    }
}


function questionback(){    /** functionality of the back button */
    if(vraagcounter === 0){
        homepage()
    }
    else{
        vraagcounter--
        loadquestions()
    }
}



/**



console.log (subjects[vraagnummer].statement)
console.log (subjects[vraagnummer].parties[1].position)




 */








homepage()