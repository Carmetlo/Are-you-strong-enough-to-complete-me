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
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-score");
const questionContainer = document.getElementById("question-container");
const choicesList = document.getElementById("choices");
const timerDuration = 60; // Set the timer duration in seconds

// variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timerDisplay = document.getElementById("time-remaining");
let timeLeft;
let choiceButtons = [];
let highScores = [];
let finalScore;


// Function to display a question and answer choices
function displayQuestion(questionIndex) {
  if (questionIndex >= quizQuestions.length) {

    //show submit button when all questions are answered
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

  quizQuestions[questionIndex].choices.forEach((choice, index) => {
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
  const timerDisplay = document.getElementById("time-remaining");
  

  if (selectedAnswer === correctAnswer) {
    score++;
    choiceButtons[choiceIndex].button.classList.add("correct");

    setTimeout(function () {
      choiceButtons[choiceIndex].button.classList.remove("correct");
      currentQuestionIndex++;

      if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion(currentQuestionIndex);
      } else if (timeLeft > 0) {
        setTimeout(endGame, 1000);
      } else {
        setTimeout(endGame, 1000);
      }
    }, 1000 * 1);
  } else {
    score--;
    messageElement.textContent = `Incorrect! Select Again! -${timePenalty} penalty`;
    choiceButtons[choiceIndex].button.classList.add("incorrect");
    choiceButtons[choiceIndex].button.disabled = true;

    timeLeft -= timePenalty;
    timerDisplay.textContent = timeLeft;
  }
}

// Function to start the timer
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
      if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion(currentQuestionIndex);
      } else if (timeLeft > 0) {
        setTimeout(endGame, 1000);
      } else {
        setTimeout(endGame, 1000);

      }
    } else {
      if (timerDisplay) {
        timerDisplay.textContent = timeLeft;
      }
      timeLeft--;
    }
  }, 1000);
}

// start quiz
function startQuiz() {
  questionContainer.classList.remove("hide");
  initialsInput.classList.add("hide");
  startButton.style.display = "none";

  timeLeft = timerDuration;

  displayQuestion(currentQuestionIndex);

  startTimer();
}

// Game over elements
const highScoresList = document.getElementById("high-scores");
const gameOverText = document.getElementById("game-over");
const tryAgainButton = document.getElementById("try-again");

// Storing the final score and displaying try again button
function endGame() {
  finalScore = score;

  initialsInput.style.display = "inline-block";
  submitButton.style.display = "block";

  questionContainer.style.display = "none";
  choicesList.style.display = "none";

  function clearScores() {
    localStorage.removeItem('highScores');
    highScoresList.innerHTML = '';
  }
  const clearScoresButton = document.getElementById("clear-scores");
  clearScoresButton.addEventListener("click", clearScores);
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
  highScoresList.innerHTML = "High Scores:<br><br>" + sortedHighScores.map(score => `<li>${score.initials} - ${score.score}</li>`).join('');

  initialsInput.style.display = "none";
  submitButton.style.display = "none";
  tryAgainButton.style.display = "block";
  highScoresList.style.display = "block";
}

submitButton.addEventListener("click", submitScore);

// Function to handle the game over state
function gameOver() {
  gameOverText.classList.remove("hide");
  tryAgainButton.classList.remove("hide");

  questionContainer.classList.add("hide");
  choicesList.classList.add("hide");
  submitButton.style.display = "none";
  initialsInput.style.display = "none";

  const timerDisplay = document.getElementById("time-remaining");
  timerDisplay.textContent = "0";

  currentQuestionIndex = 0;
  score = 0;

  highScoresList.classList.remove("hide");

  clearInterval(timer)
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startQuiz);

tryAgainButton.addEventListener("click", () => {
  gameOverText.classList.add("hide");
  tryAgainButton.classList.add("hide");

  startQuiz();
});