document.getElementById("start-quiz").addEventListener("click", startQuiz);

const questions = [
  { question: "What is C programming?", options: ["Query language", "Procedural Language", "Object oriented language"], answer: "Procedural Language" },
  { question: "How to print statements?", options: ["Println", "Print", "printf"], answer: "printf" },
  { question: "Which data type represents numbers?", options: ["int", "double", "float"], answer: "int" },
  { question: "Which operator performs a binary shift?", options: ["++", "--", ">>"], answer: ">>" },
  { question: "How are comments represented in C?", options: ["#", "///", "//"], answer: "//" }
];

let index = 0; // Define globally

function startQuiz() {
    index = 0; // Reset index when quiz starts
    document.getElementById("start-quiz").style.display = "none"; // Hide start button
    updateQuizUI();
}

function updateQuizUI() {
    let questionSelection = document.getElementById("question-selection");
    questionSelection.innerHTML = "";
     if (index >= questions.length) {
        questionSelection.innerHTML = `<h2>Quiz Completed! 🎉</h2>`;
        document.getElementById("start-quiz").style.display = "block"; // Show start button again
        return;
    }
    let questionText = document.createElement("p");
    questionText.innerHTML = `${index + 1}. ${questions[index].question}`;
    questionSelection.appendChild(questionText);

    let optionsContainer = document.createElement("div");
    optionsContainer.classList.add("option-container");

    questions[index].options.forEach(option => { 
        let button = document.createElement("button");
        button.innerText = option;
        button.addEventListener("click", () => checkAnswer(option, questions[index].answer, button));
        optionsContainer.appendChild(button);
    });

    questionSelection.appendChild(optionsContainer);

    let nextButton = document.createElement("button");
    nextButton.classList.add("next-button");
    nextButton.innerText = "Next";

    nextButton.onclick = () => {
        if (index < questions.length - 1) {
            index++;
          
            updateQuizUI(); // Update UI without restarting quiz
        } else {
            questionSelection.innerHTML = `<h2>Quiz Completed! 🎉</h2>`;
            document.getElementById("start-quiz").style.display = "block"; // Show start button again
        }
    };

    questionSelection.appendChild(nextButton);
    fetchjoke();
}

function checkAnswer(selectedOption, correctAnswer, button) {
    if (selectedOption === correctAnswer) {
        button.style.backgroundColor = "green"; // Correct answer
    } else {
        button.style.backgroundColor = "red"; // Wrong answer
    }

    // Disable all buttons after selection
    document.querySelectorAll(".option-container button").forEach(btn => btn.disabled = true);
}


function fetchjoke()
{   document.getElementById('quiz-joke').innerHTML = "";
    fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response=>response.json())
    .then(data=>{
      document.getElementById('quiz-joke').innerHTML =
        `<h3>JOKE:</h3><p><strong>${data.setup}</strong> — ${data.punchline}</p>`;
    })
    .catch(error => console.error('Error fetching joke:', error));

}