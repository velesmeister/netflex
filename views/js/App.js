class App {
    constructor() {
        this.socket = io();
        this.router = new Router([
            new Route('task', 'task.html'),
            new Route('/', 'index.html', true)
        ]);


        this.listen();
    }

    listen() {
        // Получили сообщение с сервера
        this.socket.on('message', (msg) => {
            console.log('Got this from server: ', msg);
        })
    }
}