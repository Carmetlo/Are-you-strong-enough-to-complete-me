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
const timerDuration = 60; // Set the timer duration in seconds

// start quiz
function startQuiz() {
// start the timer
startTimer();

let timeLeft = timerDuration;
const timerDisplay = document.getElementById("time-remaining");

timer = setInterval(function() {
  if (timeLeft <= 0) {
    clearInterval(timer); // Stop the timer
    endGame();
  } else {
    timerDisplay.textContent = timeLeft; // Update the timer display
    timeLeft--;
  }
}, 1000); // The timer should run every 1 second (1000 milliseconds)

// Show the question container
questionContainer.classList.remove("hide");

// Display the first question
displayQuestion(currentQuestionIndex);
}

// Show the question container
const questionContainer = document.getElementById("question-container");

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
function handleAnswerClick(selectedAnswer, correctAnswer, choiceIndex) {
if (selectedAnswer === correctAnswer) {
  score++;
} else {
  // Subtract time from the timer for incorrect answers (You can implement timer logic here)
}

currentQuestionIndex++;
displayQuestion(currentQuestionIndex);
}

// Function to start the timer
function startTimer() {
let timeLeft = timerDuration;
timer = setInterval(function () {
  if (timeLeft <= 0) {
    endGame();
    clearInterval(timer);
  } else {
    // Update the timer display
    // You can display the remaining time to the user.
    timeLeft--;
  }
}, 1000); // Timer updates every 1 second (1000 milliseconds).
}

// Function to end the game
function endGame() {
// Display the final score
const finalScore = score;
// Allow users to save their initials and score in local storage or a data structure for high scores
// Implement your high score logic here, e.g., store the score in localStorage.
localStorage.setItem('highScore', finalScore);
// You can also prompt the user to enter their initials and save it along with the score.

// Reset the game or display a game-over screen.
// Implement your game-over logic here.
}

// Add an event listener to the "Start Quiz" button to begin the quiz
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startQuiz);
