const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const io = require('socket.io')
const port = 3000;

const app = express();
const server = http.createServer(app);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', ((req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve('views', 'index'));
}))

// Тут клиент пытается создать с нами стабильное соедениние
io.on('connection', (socket) => {
    // Тут уже создал, теперь мы можем с ним общаться с помощью объекта socket
    console.log('a user connected');

    // Обрабатываем сообщение с кллиента
    socket.on('message', (msg) => {
        console.log(msg);
    })

    socket.emit('message', 'wsuuup'); // Отправили клиенту
})

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})
