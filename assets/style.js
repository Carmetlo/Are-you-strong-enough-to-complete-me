// Quiz questions restarted from scratch need to complete in one sitting!
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

const submitButton = document.getElementById("submit-score");

// variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerDisplay;
let timeLeft;
const timerDuration = 60; // Set the timer duration in seconds

// start quiz
function startQuiz() {
// start the timer
startTimer();

timerDisplay = document.getElementById("time-remaining");

timeLeft = timerDuration;


timer = setInterval(function() {
  if (timeLeft <= 0) {
    clearInterval(timer); // Stop the timer
    endGame();
    gameOver();
  } else {
    timerDisplay.textContent = timeLeft; // Update the timer display
    timeLeft--;
  }
}, 1000); // The timer should run every 1 second (1000 milliseconds)

// Show the question container
const questionContainer = document.getElementById("question-container");
questionContainer.classList.remove("hide");

// Display the first question
displayQuestion(currentQuestionIndex);
}



// Function to display a question and answer choices
function displayQuestion(questionIndex) {
const questionText = document.getElementById("question");
const choicesList = document.getElementById("choices");

// Check if all questions have been answered
if (questionIndex >= quizQuestions.length) {
  endGame();
  // Show the submit button when all questions have been answered
  submitButton.style.display = "block";
  return;
} else {
  // Hide the submit button for regular questions
  submitButton.style.display = "none";
}

// Display the question and answer choices
const question = quizQuestions[questionIndex];
questionText.textContent = question.question;
choicesList.innerHTML = "";

question.choices.forEach((choice, index) => {
  const choiceButton = document.createElement("button");
  choiceButton.textContent = choice;
  choiceButton.classList.add("choice");
  choiceButton.addEventListener("click", () => handleAnswerClick(choice, question.correctAnswer, index));
  choicesList.appendChild(choiceButton);
});
}

// Function to handle user clicks on answer choices
function handleAnswerClick(selectedAnswer, correctAnswer, choiceIndex, questionIndex) {
if (selectedAnswer === correctAnswer) {
  score++;
  currentQuestionIndex++;
} else {
const timePenalty = 10;
const timerDisplay = document.getElementById("timer-remaining");
const messageElement = document.getElementById("incorrect-message");
messageElement.textContent = "Incorrect!  Try again!";
timeLeft -= timePenalty;//adding time penalty
}

timerDisplay.textContent = timeLeft;

const choicesList = document.getElementById("choices");
const choiceButtons = choicesList.querySelectorAll(".choice");
choiceButtons.forEach((choiceButton) => {
  choiceButton.removeEventListener("click", () => 
  handleAnswerClick(selectedAnswer, correctAnswer, choiceIndex, questionIndex)
  );
});


currentQuestionIndex++;
displayQuestion(currentQuestionIndex);
}


function startTimer() {
let timeLeft = timerDuration;
timer = setInterval(function () {
  if (timeLeft <= 0) {
    endGame();
    clearInterval(timer);
    gameOver();
  } else {
    timerDisplay.textContent = timeLeft;
    timeLeft--;
  }
}, 1000); 
}


function endGame() {

const finalScore = score;

localStorage.setItem('highScore', finalScore);
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startQuiz);

function gameOver() {
  const gameOverText = document.getElementById("game-over");
  const tryAgainButton = document.getElementById("try-again");

  gameOverText.classList.remove("hide");
  tryAgainButton.classList.remove("hide");

  clearInterval(timer);
  const timerDisplay = document.getElementById("time-remaining");
  timerDisplay.textContent = "0";

  currentQuestionIndex = 0;
  score = 0;

  submitButton.style.display = "none";
}

const tryAgainButton = document.getElementById("try-again");
tryAgainButton.addEventListener("click", () =>{
gameOverText.classList.add("hide");
tryAgainButton.classList.add("hide");

startQuiz();
});