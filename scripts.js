// Function to generate 40 questions with options
function generateQuestions() {
    const questions = [];
    for (let i = 0; i < 40; i++) {
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
                ['c', 'e'],         // Question 1
                ['c', 'd'],         // Question 2
                ['a', 'b', 'd'],    // Question 3
                ['b', 'c'],         // Question 4
                ['a', 'e'],         // Question 5
                ['b'],              // Question 6
                ['c', 'd'],         // Question 7
                ['a'],              // Question 8
                ['d'],              // Question 9
                ['a', 'b'],         // Question 10
                ['c', 'e'],         // Question 11
                ['a', 'c', 'd'],    // Question 12
                ['b', 'e'],         // Question 13
                ['a'],              // Question 14
                ['b', 'd'],         // Question 15
                ['a', 'c'],         // Question 16
                ['b', 'd'],         // Question 17
                ['c', 'e'],         // Question 18
                ['a', 'b'],         // Question 19
                ['d'],              // Question 20
                ['a', 'c'],         // Question 21
                ['b'],              // Question 22
                ['d'],              // Question 23
                ['a', 'b'],         // Question 24
                ['c', 'd'],         // Question 25
                ['a', 'e'],         // Question 26
                ['b', 'c'],         // Question 27
                ['a', 'd'],         // Question 28
                ['b', 'e'],         // Question 29
                ['c'],              // Question 30
                ['a'],              // Question 31
                ['b', 'd'],         // Question 32
                ['c', 'e'],         // Question 33
                ['a', 'b', 'd'],    // Question 34
                ['c', 'e'],         // Question 35
                ['a', 'b', 'c'],    // Question 36
                ['d', 'e'],         // Question 37
                ['a', 'b'],         // Question 38
                ['c', 'd'],         // Question 39
                ['a', 'e']          // Question 40
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
                        }
            
                        modalCloseBtn.onclick = function() {
                            modal.style.display = 'none';
                        }
            
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
            