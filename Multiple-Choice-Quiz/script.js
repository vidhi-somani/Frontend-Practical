// Questions stored as an array of objects
const questions = [
  {
    question: "Which keyword is used to declare a variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    correct: 2
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correct: 0
  },
  {
    question: "What is the result of typeof 42 in JavaScript?",
    options: ["string", "number", "boolean", "undefined"],
    correct: 1
  },
  {
    question: "Which symbol is used for strict equality comparison?",
    options: ["=", "==", "===", "=>"],
    correct: 2
  }
];

let currentIndex = 0;
let score = 0;

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const counter = document.getElementById("counter");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// Show the current question with radio buttons
function showQuestion() {
  const q = questions[currentIndex];

  counter.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  for (let i = 0; i < q.options.length; i++) {
    const label = document.createElement("label");
    label.className = "option";
    label.innerHTML =
      '<input type="radio" name="answer" value="' + i + '"> ' + q.options[i];
    optionsEl.appendChild(label);
  }

  // Next stays disabled until an option is selected
  nextBtn.disabled = true;
  nextBtn.textContent = (currentIndex === questions.length - 1) ? "Finish" : "Next";
}

// Enable the Next button when any radio button is selected
optionsEl.addEventListener("change", function () {
  nextBtn.disabled = false;
});

nextBtn.addEventListener("click", function () {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;

  // Increase score if the answer is correct
  if (Number(selected.value) === questions[currentIndex].correct) {
    score++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  const percentage = (score / questions.length) * 100;
  let message;
  if (percentage === 100) {
    message = "Excellent work!";
  } else if (percentage >= 50) {
    message = "Good job!";
  } else {
    message = "Keep practising!";
  }

  document.getElementById("score-text").textContent = "Score: " + score + "/" + questions.length;
  document.getElementById("percent-text").textContent = "Percentage: " + percentage + "%";
  document.getElementById("feedback").textContent = message;
}

restartBtn.addEventListener("click", function () {
  currentIndex = 0;
  score = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
});

showQuestion();
