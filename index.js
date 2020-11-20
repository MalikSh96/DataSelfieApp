//This file will contain the server code
//In order to make use of express we need to use require (like an import statement)
//all info from express will be stored in the const express, which allows us access to functionalities of express
const express = require('express');
const app = express();
app.listen(3000, () => console.log("listening at port 3000"));
/*
We are going to use express.static
We pass the directory name, file or folder in static('xxx')
Whatever we have in the public folder will be public to everyone 
*/
app.use(express.static('public'));

app.use(express.json({limit: '1mb'}));

app.post('/api', (request, response) => {
    //The function here takes 2 arguments, request and response
    //request variable holds everything that's contained withing that request, all the data that's being sent etc.
    //response variable can be used to send things back to the client
    const data = {
        latitude: request.body.lat,
        longitude: request.body.lon,
        timestamp: request.body.timestamp
    }
    //const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    //database.insert(data);
    response.json(data);
});






/*Test code
console.log("hello");

const x = 5;

console.log(x + 2);*/
