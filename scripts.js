// Function to generate 40 questions with options
function generateQuestions() {
    const questions = [];
    for (let i = 0; i < 32; i++) {
        questions.push({
            question: `Question ${i + 1}: cochez les cases que vous avez choisies à l'examen`,
            options: ['a', 'b', 'c', 'd', 'e']
        });
    }
    return questions;
}

// Function to dynamically load questions
function loadQuestions() {
    const questionsContainer = document.getElementById('questions-container');
    if (!questionsContainer) {
        console.error('Conteneur de questions non trouvé.');
        return;
    }

    const questions = generateQuestions();
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>${q.question}</p>
            <div class="options">
                ${q.options.map(option => `
                    <label class="option-label">
                        <input type="checkbox" name="q${index + 1}" value="${option}">
                        ${option.toUpperCase()}
                    </label>
                `).join('')}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
}

// Event listener for form submission (grading)
document.addEventListener('DOMContentLoaded', function () {
    const examForm = document.getElementById('exam-form');
    if (examForm) {
        examForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let score = 0;

            const correctAnswers = [
                ['b', 'c', 'e'],     // Question 1
                ['a', 'd', 'e'],         // Question 2
                ['c', 'd'],    // Question 3
                ['a'],         // Question 4
                ['c', 'e'],         // Question 5
                ['a', 'b', 'd'],    // Question 6
                ['a', 'b', 'd'],         // Question 7
                ['a', 'd'],              // Question 8
                ['a', 'b', 'e'],              // Question 9
                ['a', 'b', 'e'],         // Question 10
                ['a', 'b'],         // Question 11
                ['d', 'e'],    // Question 12
                ['a', 'b'],         // Question 13
                ['a', 'e'],              // Question 14
                ['a', 'c'],         // Question 15
                ['b', 'c'],         // Question 16
                ['a', 'd'],         // Question 17
                ['a', 'd'],         // Question 18
                ['a', 'd'],         // Question 19
                ['d', 'e'],              // Question 20
                ['b', 'd'],         // Question 21
                ['d'],              // Question 22
                ['b', 'c'],              // Question 23
                ['d', 'e'],         // Question 24
                ['c', 'e'],         // Question 25
                ['c'],         // Question 26
                ['a', 'c'],         // Question 27
                ['b', 'e'],         // Question 28
                ['a', 'c', 'd'],         // Question 29
                ['c', 'd'],              // Question 30
                ['b'],              // Question 31
                ['a'],         // Question 32
              
            ];

            correctAnswers.forEach((correct, index) => {
                const checkboxes = document.querySelectorAll(`input[name="q${index + 1}"]`);
                const checkedOptions = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
                const correctOptions = correct.sort();
                const selectedOptions = checkedOptions.sort();
                
                let questionScore = 0;
                if (selectedOptions.length === 0) {
                    questionScore = 0; // If no option is selected, score is 0
                } else if (selectedOptions.every(opt => correctOptions.includes(opt)) && selectedOptions.length <= correctOptions.length) {
                    questionScore = selectedOptions.length / correctOptions.length;
                }

                checkboxes.forEach(checkbox => {
                    if (correct.includes(checkbox.value)) {
                        checkbox.parentElement.classList.add('correct');
                    } else if (checkbox.checked) {
                        checkbox.parentElement.classList.add('incorrect');
                    }
                });

                score += questionScore;
            });

            const finalScore = score / correctAnswers.length * 20;
            const resultMessage = document.getElementById('result');

            let message = '';
            if (finalScore > 15) {
                message = 'Khebach XD';
                resultMessage.style.color = 'green';
            } else if (finalScore >= 10) {
                message = 'Félicitations, voici votre note : ';
                resultMessage.style.color = 'blue';
            } else {
                message = 'Désolé, voici votre note : ';
                resultMessage.style.color = 'red';
            }
            resultMessage.textContent = `${message} ${finalScore.toFixed(2)}/20`;

            // Display modal with result message
            const modal = document.getElementById('result-modal');
            const modalMessage = document.getElementById('modal-message');
            const closeModalBtn = document.getElementById('close-modal-btn');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            
            if (finalScore > 15) {
                modalMessage.textContent = 'Khebach XD';
                modalMessage.style.color = 'green';
            } else if (finalScore >= 10) {
                modalMessage.textContent = `Félicitations, voici votre note : ${finalScore.toFixed(2)}/20`;
                modalMessage.style.color = 'blue';
            } else {
                modalMessage.textContent = `Désolé, voici votre note : ${finalScore.toFixed(2)}/20`;
                modalMessage.style.color = 'red';
            }
            
            modal.style.display = 'block';

            // Close the modal when close button or outside modal is clicked
            closeModalBtn.onclick = function() {
                modal.style.display = 'none';
            };

            modalCloseBtn.onclick = function() {
                modal.style.display = 'none';
            };

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };
        });
    } else {
        console.error('Formulaire d\'examen non trouvé.');
    }

    loadQuestions();
});

