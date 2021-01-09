import { initEventListeners, loaderOff, loaderOn } from "./utils/appUtils.js";
import { Task } from "./Task/Task.js";
import { taskLink, theoryLink } from "./config.js";
import { Route, Router } from "./Router/Router.js";


export class App {
    constructor() {
        this.socket = io();
        this.task = undefined;
        this.user = undefined;

        this.router = new Router([
            new Route('task', 'task.html'),
            new Route('practice', 'practice.html', true),
            new Route('theory', 'theory.html')
        ]);

        initEventListeners(this.setUser);
        this.logicListen();
    }

    logicListen() {

        document.addEventListener('click', (e) => {
            if (e.target.getAttribute('name') === 'taskSelector') {
                this.task = e.target.children[0].innerText;
                window.location.href = taskLink;
                loaderOn();
                this.socket.emit('getTask', this.task, (resp) => {
                    console.log('Got response: ', resp);
                    this.task = new Task(resp.data);
                    loaderOff();
                })
            }
        });
    }

    setUser = (user) => {
        this.user = user;
        console.log('Seted user: ', this.user)
    }

    socketListen () {
    }
}