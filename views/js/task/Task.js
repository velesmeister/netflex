class Task {

    constructor (questions : [{
         quest: string,
         v: [string],
         otvet: string,
         coments: string,
         imgStc: string,
         biletNumber: string,
         questNumber: string,
        }], socket) {

        self.questions = questions;
        self.currentQuestion = 0;

        // DOM - elements
        self.questionText = document.getElementById("questionText");
        self.questionImg = document.getElementById("questionText");
        self.questionSupportBtn = document.getElementById("questionSupportBtn");
        self.questionSupport = document.getElementById("questionSupports");
        self.questionNumber = document.getElementById("questionNumber");
        self.questionsList = document.getElementById("questionsList");
        self.answerOptions = document.getElementById("answerOptions");

        self.restore();
        self.initDom();
        self.renderQuestion();
        self.listen();
    }

    restore () {
        self.questionImg.style.backgroundImage = '';

        self.questionText.innerHTML = '';
        self.questionSupportBtn.innerHTML = '';
        self.questionSupport.innerHTML = '';
        self.questionNumber.innerHTML = '';
        self.questionsList.innerHTML = '';
        self.answerOptions.innerHTML = '';
    }

    initDom () {
        for(let i = 0; i < self.questions.length; ++i) {
            self.questionsList.innerHTML += `<div class="number-tasks" id="${i + 1}"><a>${i + 1}</a></div>`;
        }

        // Add listeners
        self.answerOptions.addEventListener('click', (e) => {
            console.log('Clicked on answer option');
            console.log(e.target);
        });

        self.questionsList.addEventListener('click', (e) => {
            console.log('Clicked on questions selector');
            console.log(e.target);
        });

        self.questionSupportBtn.addEventListener('click', (e) => {
            console.log('Clicked on support btn');
            console.log(e.target);
        })
    }

    renderQuestion() {
        self.restore();

        self.questionNumber.innerHTML = self.currentQuestion.toString();
        self.questionText.innerHTML = self.questions[self.currentQuestion].quest;
        self.questionImg.style.backgroundImage = `url(img/tasks/${self.questions[self.currentQuestion].biletNumber}_
                                                  ${self.questions[self.currentQuestion].questNumber}.jpg)`;
        self.questions[self.currentQuestion].v.forEach(option => {
            self.answerOptions.innerHTML += `<div className="option" value="${option}"><a value="${option}">${option}</a></div>`;
        });
        self.questionSupport.innerHTML = self.questions[self.currentQuestion].coments;
    }

    listen(socket) {
    }
}