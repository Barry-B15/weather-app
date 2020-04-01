console.log('Hi'); //0.0 test the server

const express = require('express'); //1.0
const app = express(); //2.0

const port = 3300; //3.0
app.use(express.static('public')); //4.0 the go create a public dir, & create index.html inside it

app.listen(port, () => console.log(`Listening at localhost: ${port}`)); //3.1