const http = require('http');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const tasksUpdate = require('./src/tasks_parser.js').updateDbTasks;
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


const uri = "mongodb+srv://veles:23347835@cluster0.kagno.mongodb.net/netflex?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;


// Не советую раскомментирование))
// tasksUpdate();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views', 'js', 'utils')));

app.get('/', ((req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve('views', 'index.html'));
}))

app.get('/Task', ((req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve('views', 'Task.html'));
}))

app.get('/Theory', ((req, res, next) => {
    res.status(200);
    res.sendFile(path.resolve('views', 'Theory.html'));
}))

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('getTask', (taskNum, callback) => {
        console.log(`Got task num: ${taskNum}`);
        const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true,});
        mongoClient.connect((err, client) => {
            if (err) {
                return console.log(err);
            }

            const db = client.db("netflex");
            const collection = db.collection("tasks");

            const objectToFind = {};
            if(taskNum > 0) {
                objectToFind.biletNumber = taskNum;
            }

            collection.find(objectToFind).toArray((err, data) => {
                if (err) return console.log(err);

                callback({data});
                client.close();

            });
        });
    })

    socket.on('message', (msg) => {
        console.log(msg);
    })
})

server.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})
