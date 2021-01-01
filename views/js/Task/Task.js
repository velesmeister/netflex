import {green, red, white, black, grey } from "../config.js";

export class Task {

    constructor (questions, socket) {
        /* questions : [{
         quest: string,
         v: [string],
         otvet: string,
         coments: string,
         imgStc: string,
         biletNumber: string,
         questNumber: string,
        }, ...] */

        this.timer = null;
        this.questions = questions;
        this.currentQuestion = 0;

        // DOM - elements
        this.questionText = document.getElementById("questionText");
        this.questionImg = document.getElementById("questionImg");
        this.questionSupportBtn = document.getElementById("questionSupportBtn");
        this.questionSupport = document.getElementById("questionSupport");
        this.questionNumber = document.getElementById("questionNumber");
        this.questionsList = document.getElementById("questionsList");
        this.answerOptions = document.getElementById("answerOptions");
        this.answerNum = document.getElementById("answerNum");
        this.answerExp = document.getElementById("answerExplanation");
        this.restore();
        this.initDom();
        this.renderQuestion();
        this.listen();
    }

    restore () {
        this.questionImg.style.backgroundImage = '';

        this.questionText.innerHTML = '';
        this.questionSupport.style.display = 'none';
        this.questionNumber.innerHTML = '';
        this.answerOptions.innerHTML = '';
    }

    initDom () {
        let questionsList = '';
        for (let i = 0; i < this.questions.length; ++i) {
            questionsList += `<div class="number-tasks" id="${i + 1}"><a class="questionSelector">${i + 1}</a></div>`;
        }
        document.getElementById("questionsList").innerHTML = questionsList;

        // Add listeners
        document.addEventListener('click', (e) => {
            if(e.target.className === 'option') {
                this.questions[this.currentQuestion].selectedAns = e.target.getAttribute("value");
                this.markSelectedAns();
            }

            if(e.target.className === 'number-tasks') {
                if(!this.questions[this.currentQuestion].selectedAns) {
                    document.getElementById((this.currentQuestion + 1).toString()).style.background = '#B6DFF6';
                    document.getElementById((this.currentQuestion + 1).toString()).children[0].style.color = black;
                } else {
                    this.markSelectedAns(this.questions[this.currentQuestion].selectedAns);
                }
                this.currentQuestion = parseInt(e.target.id) - 1;
                this.renderQuestion();
            }
        });

        this.questionSupportBtn.addEventListener('click', () => { this.showSupport() });

        this.timer = setInterval( () => {
            let [min, sec] = document.getElementById("timer").innerText.split(':').map(t => parseInt(t));
            [min, sec] = [min + Math.floor((sec + 1) / 60), (sec + 1) % 60]
            document.getElementById("timer").innerText =
                `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
        }, 1000);
    }

    renderQuestion() {
        this.restore();

        document.getElementById((this.currentQuestion + 1).toString()).style.background = grey;
        document.getElementById((this.currentQuestion + 1).toString()).children[0].style.color = white;

        this.questionNumber.innerHTML = (this.currentQuestion + 1).toString() + '/' + this.questions.length.toString();
        this.questionText.innerHTML = this.questions[this.currentQuestion].quest;

        this.questionImg.style.backgroundImage = `url(img/tasks/${this.questions[this.currentQuestion].biletNumber}_${this.questions[this.currentQuestion].questNumber}.jpg)`;

        this.questions[this.currentQuestion].v.forEach( (option, ind) => {
            if (option) {
                this.answerOptions.innerHTML += `<div class="option" value="${ind + 1}"><a class="optionSelector">${option}</a></div>`;
            }
        });

        this.answerExp.innerText = this.questions[this.currentQuestion].comments;
        this.answerNum.innerText = this.questions[this.currentQuestion].otvet;
        this.markSelectedAns();
    }

    markSelectedAns () {
        const selectedAns = this.questions[this.currentQuestion].selectedAns;
        if(selectedAns) {
            this.answerOptions.children[selectedAns - 1].style.background = selectedAns === this.questions[this.currentQuestion].otvet ? green : red;
            this.answerOptions.children[selectedAns - 1].children[0].style.color = white;

            document.getElementById((this.currentQuestion + 1).toString()).style.background = selectedAns === this.questions[this.currentQuestion].otvet ? green : red;
            if (selectedAns !== this.questions[this.currentQuestion].otvet) {
                this.showSupport();
            }
        }
        this.checkIsOver();
    }

    checkIsOver () {
        let correctAnswers = 0;
        let wrongAnswers = 0;
        for(let question of this.questions) {
            if (question.selectedAns) {
                correctAnswers += question.selectedAns === question.otvet;
                wrongAnswers += question.selectedAns !== question.otvet;
            } else {
                return;
            }
        }

        alert(`The task is over.\nCorrect answers: ${correctAnswers}\nWrong answers: ${wrongAnswers}`);
    }

    showSupport() {
        this.questionSupport.style.display === 'block' ?
            this.questionSupport.style.display = 'none' :  this.questionSupport.style.display = 'block';
    }

    listen(socket) {
    }
}