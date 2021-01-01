import { initEventListeners } from "./utils/appUtils.js";
import { Task } from "./Task/Task.js";
import { taskLink, theoryLink } from "./config.js";
import { Route, Router } from "./Router/Router.js";
import { initTheory } from "./Theory/theory.js";


export class App {
    constructor() {
        this.socket = io();
        this.task = undefined;

        this.router = new Router([
            new Route('task', 'task.html'),
            new Route('practice', 'practice.html', true),
            new Route('theory', 'theory.html')
        ]);

        initEventListeners();
        this.logicListen();
    }

    logicListen() {

        document.addEventListener('click', (e) => {
            if (e.target.getAttribute('name') === 'taskSelector') {
                this.task = e.target.children[0].innerText;
                console.log('Task: ', this.task)
                window.location.href = taskLink;
                this.socket.emit('getTask', this.task, (resp) => {
                    console.log('Got response: ', resp);
                    this.task = new Task(resp.data);
                })
            }
        });

    }

    socketListen () {
    }
}