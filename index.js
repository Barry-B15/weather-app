console.log('Hi'); //0.0 test the server

const express = require('express'); //1.0
const app = express(); //2.0

const port = 3300; //3.0
app.use(express.static('public')); //4.0 the go create a public dir, & create index.html inside it

app.use(express.json({ limit: '1mb' })); //5.2B ask app to use express.json and add a limit

app.listen(port, () => console.log(`Listening at localhost: ${port}`)); //3.1

//5.0 adding post request
app.post('/api', (request, response) => {
    //response.send("Post request to homepage");
    //console.log(request); // 5.1 1st log the request, returns tonnes of log in the terminal

    //5.2A our interest is in the body, let's console log
    console.log(request.body);

    //5.3 return the response
    const data = request.body;
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    }); //5.3 end go to the client side to receive it, ADD a then() to fetch
}); //5.1 end: then set it up in app.js