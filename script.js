// stored variables
var startEl = document.getElementById("start-button");
var highScore = document.getElementById("highScore");
var timerEL = document.getElementById("timer");
var qIndex = 0;
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");

var score = 0;
var storedHighScore = 0;
var quizCountdown = 60;
var currentQuestion;

// Array of questions for the user to answer
var questions = [

    {
        title: "Is Javascript the same thing as Java?",
        choices:[ "Yes", "No", "Maybe" ],
        answer: "No"
    },

    {
        title: "What year was Javascript created?",
        choices:[ "1982", "1995", "2020" ],
        answer:  "1995"
    },

    {
        title: "Approximately what percentage of websites use Javascript?",
        choices:[ "50%", "75%", "95%" ],
        answer: "95"
    },

    {
        title: "NaN in Javascript stands for Not a number ?",
        choices:[ "Yes", "No", ],
        answer: "Yes"
    },

    {
        title: "What is the command to add JS commands to an HTML document?",
        choices: [".appendChild", ".concat", "JSON.stringify", ".split"],
        answer: ".appendChild"
    },

];

// function to start the quiz
function startQuiz() {
    $("#go").empty();
    var getStart = document.getElementById("start");

    getStart.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    quizTimer();
    displayQuestion();
}


function displayQuestion() {
    currentQuestion = questions[qIndex]

    var titleEL = document.getElementById("qTitle")
    titleEL.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function (choice, i) {

        var choiceBtn = document.createElement("button")
        choiceBtn.setAttribute("class", "choice")
        choiceBtn.setAttribute("value", choice)
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = click;
        choicesEl.appendChild(choiceBtn);



    })
    console.log(qIndex)

}

function click() {
    qIndex++;
    if (($(this).attr("value")) !== currentQuestion.answer) {
        quizCountdown = quizCountdown - 5;

    } else {
        score += quizCountdown;
        console.log("score" + score);
    }
    if (qIndex === questions.length) {
        console.log("gameover")
        $("#score1").empty();
        $("#score1").text("Your score is: " + score)
    } else {
        displayQuestion();
    }
}

function quizTimer() {
    // var quizCountdown = 60;
    var timerInterval = setInterval(function () {
        timerEL.textContent = "time " + quizCountdown;
        quizCountdown--;
        console.log("countdown")
        if (quizCountdown === 0 || questions.length === qIndex) {
            clearInterval(timerInterval);
            timerEL.textContent = "";
            if (score > storedHighScore) {
                $("#score1").text("New High Score! " + score);
                $(".initial").show();
                console.log("I win")
            } else {
                $("#score1").text("Score: " + score);
                console.log("I lose")

            }
        }
        }, 1000)


}

startEl.onclick = startQuiz;
choicesEl.onclick = choices;

$(".initial").on("click", "button", function(){
    storedHighScore = score;
    var initials = $("#init").val();
    console.log(initials)
    $(".initial").empty();
    var highScoreAry = [initials, storedHighScore];
    var highScore = highScoreAry.toString();
    localStorage.setItem("High Score", highScore);
})

var sto = localStorage.getItem("High Score");
console.log(sto);
sto= sto.split(" , ");
console.log(sto);
storedHighScore = sto[1];
