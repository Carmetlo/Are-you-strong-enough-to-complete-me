const startButton = document.getElementById("start-button");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-score");
const questionText = document.getElementById("question");
const questionContainer = document.getElementById("question-container");
const choicesList = document.getElementById("choices");
const highScoresList = document.getElementById("high-scores");
const gameOverText = document.getElementById("game-over");
const tryAgainButton = document.getElementById("try-again");
const clearScoresButton = document.getElementById("clear-scores");
const timerDuration = 60; // Set the timer duration in seconds
const introMessage = document.getElementById("intro-message");
const question = document.getElementById("question");//question text element hiding

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hypertext Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Happy Terra Math Language"],
    correctAnswer: "Hypertext Markup Language"
  },
  {
    question: "Which of the following is a JavaScript library?",
    choices: ["Java", "JScript", "jQuery", "C+"],
    correctAnswer: "jQuery"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style System", "Comradery Set Stallion"],
    correctAnswer: "Cascading Style Sheet"
  }
];

// game
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerDisplay = document.getElementById("time-remaining");
let timeLeft;
let choiceButtons = [];
let highScores = [];
let finalScore;
var scoresUL = document.getElementById ("high-scores");

// start quiz
function startQuiz() {
  questionContainer.removeAttribute("class");
  initialsInput.classList.add("hide");
  startButton.setAttribute ("class","hide");
  introMessage.classList.add("hide");
 
  if (currentQuestionIndex < quizQuestions.length) {
    question.classList.remove("hide");
  }

  timeLeft = timerDuration;

  displayQuestion();

  startTimer();
}

// Function to display a question and answer choices
function displayQuestion() {

  const question = quizQuestions[currentQuestionIndex];
  choiceButtons = [];
  const questionText = document.getElementById("question");
  const choicesList = document.getElementById("choices");

  while (choicesList.firstChild) {
    choicesList.removeChild(choicesList.firstChild);
  }

  quizQuestions[currentQuestionIndex].choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice; // Set text content here
    choiceButton.classList.add("choice");

    const clickHandler = () => handleAnswerClick(choice, question.correctAnswer, index);

    choiceButton.addEventListener("click", clickHandler);
    choicesList.appendChild(choiceButton);

    choiceButtons.push({ button: choiceButton, handler: clickHandler });
  });
}

function updateScoreDisplay() {
  const scoreDisplay = document.getElementById("high-scores"); 
  scoreDisplay.textContent = score;
}

// Function to handle user clicks on answer choices
function handleAnswerClick(selectedAnswer, correctAnswer, choiceIndex) {
  let timePenalty = 10;

  const message = document.createElement("p");
  message.classList.add("message");

  const messageContainer = document.getElementById("message-container");

  if (selectedAnswer === correctAnswer) {
    score++;
    choiceButtons[choiceIndex].button.classList.add("correct");

    message.textContent = "Correct!";
    message.style.color = "green";

    setTimeout(function () {
      choiceButtons[choiceIndex].button.classList.remove("correct");
      currentQuestionIndex++;

      if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
      } else if (timeLeft > 0) {
        setTimeout(endGame, 1000);
      } else {
        setTimeout(endGame, 1000);
      }
    }, 1000 * 1);
  } else {
    timeLeft -=10;
    timerDisplay.textContent = timeLeft;
    choiceButtons[choiceIndex].button.classList.add("incorrect");
    choiceButtons[choiceIndex].button.disabled = true;

    message.textContent = "Incorrect!";
    message.style.color = "red";

  }

  messageContainer.appendChild(message);

  setTimeout(function () {
    messageContainer.removeChild(message);
  }, 1000 * 1);

  updateScoreDisplay();
}

// Function to start the timer
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver();
    } else {
      timeLeft--;
      if (timerDisplay) {
        timerDisplay.textContent = timeLeft;
      }
    }
  }, 1000);
}

// Storing the final score and displaying try again button
function endGame() {
  finalScore = score * timeLeft;
  
  initialsInput.style.display = "flex";
  submitButton.style.display = "block";

  questionContainer.style.display = "none";
  choicesList.style.display = "none";

  clearScoresButton.classList.remove("hide");

  clearInterval(timer)
}

function submitScore(event) {
  if (event) {
    event.preventDefault();
  }

  const initials = initialsInput.value;

  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.push({ initials, score: finalScore });
  localStorage.setItem('highScores', JSON.stringify(highScores));

  const sortedHighScores = highScores.sort((a, b) => b.score - a.score);
  //highScoresList.innerHTML = "High Scores:<br><br>" + sortedHighScores.map(score => `<li>${score.initials} - ${score.score}</li>`).join('');
  printHighScores(sortedHighScores);
  initialsInput.style.display = "none";
  submitButton.style.display = "none";
  tryAgainButton.classList.remove("hide");
  //highScoresList.style.display = "block";
}
function printHighScores (scores) {
  scoresUL.textContent = "High Scores: "
  scoresUL.classList.remove("hide");
  scores.forEach (function (score){
    var li = document.createElement ("li")
    li.textContent = score.initials + ": " + score.score
    scoresUL.appendChild (li)
  })
  //scoresUL.append(scores.map (score => `<li> ${score.intitals}: ${score.score} </li>`))
}
// Function to handle the game over state
function gameOver() {
  gameOverText.classList.remove("hide");
  tryAgainButton.classList.remove("hide");
  startButton.setAttribute ("class","hide");
  choicesList.classList.add("hide");
  submitButton.style.display = "none";
  initialsInput.style.display = "none";
  highScoresList.classList.add("hide");
  console.log("Game Over!");

  question.classList.add("hide");

  timerDisplay.textContent = "0";

  currentQuestionIndex = 0;
  score = 0;

  highScoresList.classList.remove("hide");
  clearInterval(timer)
}

submitButton.addEventListener("click", submitScore);
tryAgainButton.addEventListener("click", () => {
  location.reload();
  gameOverText.classList.add("hide");
  tryAgainButton.classList.add("hide");

  startQuiz();
});

function clearScores() {
localStorage.removeItem ("highScores")
scoresUL.innerHTML = ""

}
function displayButtons (){
//clearScoresButton.setAttribute ("class","hide");
currentQuestionIndex = 0;
startButton.removeAttribute ("class");
}
clearScoresButton.addEventListener("click", clearScores);
startButton.addEventListener("click", startQuiz);