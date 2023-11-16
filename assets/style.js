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

// Function to display a question and answer choices
function displayQuestion(questionIndex) {
  if (questionIndex >= quizQuestions.length) {
    endGame();
    // Show the submit button when all questions have been answered
    submitButton.style.display = "block";
    return;
  } else {
    // Hide the submit button for regular questions
    submitButton.style.display = "none";
  }

  const question = quizQuestions[questionIndex];
  choiceButtons = [];

  
  const questionText = document.getElementById("question");
  const choicesList = document.getElementById("choices");

while (choicesList.firstChild) {
    choicesList.removeChild(choicesList.firstChild);
  }
  
  question.choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice; // Set text content here
    choiceButton.classList.add("choice");

    const clickHandler = () => handleAnswerClick(choice, question.correctAnswer, index);

    choiceButton.addEventListener("click", clickHandler);
    choicesList.appendChild(choiceButton);

    choiceButtons.push({ button: choiceButton, handler: clickHandler });
  });
}

// Function to handle user clicks on answer choices
function handleAnswerClick(selectedAnswer, correctAnswer, choiceIndex) {
  let timePenalty = 10;
  const timerDisplay = document.getElementById("timer-remaining");
  const messageElement = document.getElementById("incorrect-message");

  if (selectedAnswer === correctAnswer) {
    score++;
    displayQuestion(++currentQuestionIndex);
  } else {
    messageElement.textContent = `Incorrect! Select Again! -${timePenalty} penalty`;
    choiceButtons[choiceIndex].button.classList.add("incorrect");
    choiceButtons[choiceIndex].button.disabled = true;
    
    timeLeft -= timePenalty;
    timerDisplay.textContent = timeLeft;
  }}
 

  setTimeout(function () {
    if (selectedAnswer === correctAnswer) {
      choiceButtons[choiceIndex].button.classList.add("correct");
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion(currentQuestionIndex);
    } else {
      endGame();
      gameOver();
    }
  }, 1000);


// Function to start the timer
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver();
      endGame();
    } else {
      let timerDisplay = document.getElementById("time-remaining");
      if (timerDisplay) {
        timerDisplay.textContent = timeLeft;
      }
      timeLeft--;
    }
  }, 1000);
}

// start quiz
function startQuiz() {
    timerDisplay = document.getElementById("time-remaining");
    timeLeft = timerDuration;
  

  // Show the question container
  const questionContainer = document.getElementById("question-container");
  questionContainer.classList.remove("hide");

  displayQuestion(currentQuestionIndex);

  startTimer();
}

// Function to end the game and store the final score
function endGame() {
  const finalScore = score;
  localStorage.setItem('highScore', finalScore);
}

// Function to handle the game over state
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

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startQuiz);

const tryAgainButton = document.getElementById("try-again");
tryAgainButton.addEventListener("click", () => {
  gameOverText.classList.add("hide");
  tryAgainButton.classList.add("hide");

  startQuiz();
});

