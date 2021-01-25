const fs = require('fs');
const request = require('request');
const fetch = require('node-fetch');

const download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

const uri = "mongodb+srv://veles:23347835@cluster0.kagno.mongodb.net/netflex?retryWrites=true&w=majority";
const MongoClient = require('mongodb').MongoClient;

const updateTheory = async () => {
    console.log('In update theory');
}

const updateDbTasks = async () => {

    console.log('In update db');
    const tasks = [];
    // https://xn----8sbkahkuskl1n.com/stat26012020/img/ab/31_14.jpg 31 - bilet_number, 14 - quest number
    const taskUrl = "https://xn----8sbkahkuskl1n.com/stat26012020/quest/ab/bilet/";
    const imgUrl = "https://xn----8sbkahkuskl1n.com/stat26012020/img/ab/";

    for( let taskNum = 1; taskNum <= 40; ++taskNum) {
        const r = await fetch(taskUrl + `/b${taskNum}.json`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(r => r.json()).
        catch(err => console.error(err));
        console.log('Got ticket: ', r);
        if(r) {
            for (let i = 0; i < r.length; ++i) {
                r[i].imgSrc = `${r[i].biletNumber}_${r[i].questNumber}.jpg`;
                download(imgUrl + `${r[i].biletNumber}_${r[i].questNumber}.jpg`, `./views/img/tasks/${r[i].biletNumber}_${r[i].questNumber}.jpg`,
                    () => {
                        console.log('image download success')
                    });
            }

            tasks.push(...r);
        }
    }

    const mongoClient = new MongoClient(uri, { useNewUrlParser: true });
    mongoClient.connect((err, client) => {
        if(err) {return console.log(err);}

        const db = client.db("netflex");
        const collection = db.collection("tasks");

        for(let task of tasks) {
            collection.insertOne(task, (err, res) => {
                if(err) {
                    return console.log(err);
                }
            })
        }

        client.close();
    })
}

module.exports = {updateDbTasks};