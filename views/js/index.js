class App {
    constructor() {
        this.socket = io();
        this.listen();
    }

    doSomeLogic() {
        const msg = 'Hi there';
        this.socket.emit('message', msg); // Отправили сообщение на сервер
    }

    listen() {
        // Получили сообщение с сервера
        this.socket.on('message', (msg) => {
            console.log('Got this from server: ', msg);
        })
    }
}