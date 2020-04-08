// change this file to index.js and the corresponding file in public dir to index.html to test
console.log('Hi'); //0.0 test the server

const express = require('express'); //1.0
const app = express(); //2.0

//7. Saving user data to a local db
const Datastore = require('nedb'); //7.1


const port = 3000; //3.0
app.use(express.static('public')); //4.0 the go create a public dir, & create index.html inside it

app.use(express.json({ limit: '1mb' })); //5.2B ask app to use express.json and add a limit

app.listen(port, () => console.log(`Listening at localhost: ${port}`)); //3.1

const database = new Datastore('database.db'); //7.2
database.loadDatabase(); //7.3

//10 set up the request
app.get('/api', (request, response) => {
    //response.json({ test: '123' }); //10.1 test that we can get data
    //10.2 use find() func to get data
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

//5.0 adding post request
app.post('/api', (request, response) => {

    //5.2A our interest is in the body, let's console log
    //console.log(request.body);

    //5.3 return the response
    const data = request.body;

    //7.7 add timestamp, Remove the above, add the following and resr=tart server
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);

}); //5.1 end: then set it up in app.js