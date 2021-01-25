import {green, red, white, black, grey } from "../config.js";
import { toggleResultsModal } from "../utils/appUtils.js";

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

    restart (questions) {
        clearInterval(this.timer);
        this.questions = questions;
        this.currentQuestion = 0;
        this.restore();
        this.initDom(true);
        this.renderQuestion();
    }

    initDom (isRestore=false) {
        let questionsList = '';
        for (let i = 0; i < this.questions.length; ++i) {
            questionsList += `<div class="number-tasks" id="${i + 1}"><a class="questionSelector">${i + 1}</a></div>`;
        }
        this.questionsList.innerHTML = questionsList;

        // Add listeners
        if(!isRestore) {
            document.addEventListener('click', (e) => {
                if (e.target.className === 'option') {
                    this.questions[this.currentQuestion].selectedAns = e.target.getAttribute("value");
                    this.markSelectedAns();
                }

                if (e.target.className === 'number-tasks') {
                    if (!this.questions[this.currentQuestion].selectedAns) {
                        document.getElementById((this.currentQuestion + 1).toString()).style.background = '#B6DFF6';
                        document.getElementById((this.currentQuestion + 1).toString()).children[0].style.color = black;
                    }

                    this.currentQuestion = parseInt(e.target.id) - 1;
                    this.renderQuestion();
                }
            });

            this.questionSupportBtn.addEventListener('click', () => {
                this.showSupport()
            });
        }

        document.getElementById("timer").innerText = '00:00';
        this.timer = setInterval( () => {
            try {
                let [min, sec] = document.getElementById("timer").innerText.split(':').map(t => parseInt(t));
                [min, sec] = [min + Math.floor((sec + 1) / 60), (sec + 1) % 60]
                document.getElementById("timer").innerText =
                    `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
            } catch(e) {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    renderQuestion() {
        this.restore();

        document.getElementById((this.currentQuestion + 1).toString()).style.background = grey;
        document.getElementById((this.currentQuestion + 1).toString()).children[0].style.color = white;

        this.questionNumber.innerHTML = (this.currentQuestion + 1).toString() + '/' + this.questions.length.toString();
        this.questionText.innerHTML = this.questions[this.currentQuestion].quest;

        this.questionImg.style.backgroundImage = `url(img/tasks/${this.questions[this.currentQuestion].biletNumber}_${this.questions[this.currentQuestion].questNumber}.jpg), url(img/noAnswerImg.png)`;

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

            console.log(this.currentQuestion);
            document.getElementById((this.currentQuestion + 1).toString()).style.background = selectedAns === this.questions[this.currentQuestion].otvet ? green : red;
            if (selectedAns !== this.questions[this.currentQuestion].otvet) {
                this.showSupport();
            } else {
                this.showNext();
            }
        }
        this.checkIsOver();
    }

    showNext() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.renderQuestion(this.currentQuestion++);
        }
    }

    checkIsOver () {
        let correctAnswers = 0;
        let wrongAnswers = 0;
        const wrongAnswersList = [];
        for(let question of this.questions) {
            if (question.selectedAns) {
                correctAnswers += question.selectedAns === question.otvet;
                if (question.selectedAns !== question.otvet) {
                    wrongAnswersList.push({...question, selectedAns: undefined});
                    wrongAnswers++;
                }
            } else {
                return;
            }
        }

        this.showResults(wrongAnswers, correctAnswers, wrongAnswersList);
    }

    showResults (wrongAnswers, correctAnswers, wrongAnswersList) {
        toggleResultsModal(wrongAnswers, correctAnswers);

        document.getElementById("workForMistakesBtn").addEventListener('click', () => {
            toggleResultsModal();
            this.restart(wrongAnswersList);
        })
    }

    showSupport() {
        this.questionSupport.style.display === 'block' ?
            this.questionSupport.style.display = 'none' :  this.questionSupport.style.display = 'block';
    }

    listen(socket) {
    }
}