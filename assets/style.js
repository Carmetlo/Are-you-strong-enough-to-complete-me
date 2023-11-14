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
let timerDisplay = document.getElementById("time-remaining");
let timeLeft;
const timerDuration = 60; // Set the timer duration in seconds
let choiceButtons = [];

// start quiz
function startQuiz() {
  // start the timer
  startTimer();

  timerDisplay = document.getElementById("time-remaining");
  timeLeft = timerDuration;

  timer = setInterval(function () {
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

  // Create and append choice buttons
  choiceButtons = [];

  question.choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice; // Set text content here
    choiceButton.classList.add("choice");
    choiceButton.addEventListener("click", () => handleAnswerClick(choice, question.correctAnswer, index));
    choicesList.appendChild(choiceButton);
    choiceButtons.push(choiceButton);
  });

  choiceButtons.forEach((choiceButton) => {
    choiceButton.removeEventListener("click", () => handleAnswerClick(choiceButton.textContent, quizQuestions[currentQuestionIndex].correctAnswer, index));
  });
}

// Function to handle user clicks on answer choices
function handleAnswerClick(selectedAnswer, correctAnswer, choiceIndex) {
  let timePenalty = 10;
  const timerDisplay = document.getElementById("timer-remaining");
  const messageElement = document.getElementById("incorrect-message");

  if (selectedAnswer === correctAnswer) {
    score++;
  } else {
    messageElement.textContent = `Incorrect! Select Again! -${timePenalty} penalty`;
    choiceButtons[choiceIndex].classList.add("incorrect");
    timeLeft -= timePenalty;
  }

  choiceButtons.forEach((button, index) => {
    if (index === quizQuestions[currentQuestionIndex].choices.indexOf(correctAnswer)) {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  setTimeout(function () {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  }, 1000);
}


displayQuestion(currentQuestionIndex);



// Function to start the timer
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
      gameOver();
    } else {
      if (timerDisplay) {
        // Update the timer display only if the element exists
        timerDisplay.textContent = timeLeft;
      }
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

  const questionContainer = document.getElementById("question-container");
  const choicesList = document.getElementById("choices");
  const submitButton = document.getElementById("submit-score");

  questionContainer.classList.add("hide");
  choicesList.classList.add("hide");
  submitButton.style.display = "none";

  const timerDisplay = document.getElementById("time-remaining");
  timerDisplay.textContent = "0";

  currentQuestionIndex = 0;
  score = 0;
}

const tryAgainButton = document.getElementById("try-again");
tryAgainButton.addEventListener("click", () => {
  gameOverText.classList.add("hide");
  tryAgainButton.classList.add("hide");

  startQuiz();
});
