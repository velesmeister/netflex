const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const tasksUpdate = require('./src/tasks_parser.js').updateDbTasks;
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server)


// Не советую раскомментирование))
// tasksUpdate();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', ((req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve('views', 'index.html'));
}))

app.get('/task', ((req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve('views', 'task.html'));
}))

app.get('/theory', ((req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve('views', 'theory.html'));
}))

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log(msg);
    })

    socket.emit('message', 'wsuuup');
})

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})
