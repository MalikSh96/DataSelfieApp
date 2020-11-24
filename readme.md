# Information
Setting up a route in express (the place, the end point for the API, the address at which data will
be to).

JSON parsing to express (need the route when it receives data to understand that data as JSON and make it readable in the code)

POST with `fetch()` (adapting the `fecth()` to specify a POST request, a request that is posting data or sending data to the server)

# Server
A server is an application that runs and listens for requests (people who wants to connect to the server)

A server is going to be the central repository of the data of the application

# Node
When working with Node, it is easier to look for a node package some of the functionality you are looking for
and install that package.

It works like a library or an add-on.

Most node packages depend on other packages and npm is smart enough to know what other packages it
will need as well (for example when installing Express).

# Express
Webapp framework.

Express can be used to host static files

# Node_modules folder
Is not a folder you would normally manage.

# For this application
In this app we will be using Express to create the webserver.

Express is a web app framework, and has the functionality we will need.

If I want to use npm for this project I will need `package.json`.

Express will be a part of the dependency of the project.

`index.js` will contain the server code
- index.html is the file we want to see when we go and try to make a connection

# package.json
Is a special type of file, it is basically the configuration file for your project.

This is where all the meta info about the project, what node packages you are using and what
the project (webapplication) is called

`npm init` --> generates the `package.json` file.

In this file is where you need to make a reference to Express

# Package-lock.json
Keeps tracks of dependencies and versions of our packages

# We want the server to
Serve webpages (send the information we have such as html, css, js etc to be able to see in the browser)

# [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
You will often want to retrieve a user's location information in your web app, for example to plot their location on a map, or display personalized information relevant to their location.

The Geolocation API allows the user to provide their location to web applications if they so desire.

The Geolocation API is accessed via a call to `navigator.geolocation`.

If geolocation is available you can choose to take the next step and geolocate.
And to do that you make use of the `getCurrentPosition()` function.

The `getCurrentPosition()` function requires a callback function that is executed when the position is
ready to be retrieved.

The `geolocation.getCurrentPosition` is a function that requires a callback and this is going to
happen asynchronously - thus only when it is READY to grab the latitude and longitude, the function will
be called

# [Navigator interface](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
The Navigator interface represents the state and the identity of the user agent.
It allows scripts to query it and to register themselves to carry on some activities.

# Nodemon utility
Makes so that I don't have to rerun the server every time I make changes
`npm install -g nodemon`


# LESSON 2.3
# HTTP Post Request with fetch()
Taking data from the client, latitude and longitude and send it to the server and have the server receive it.

Client executes its own client side javascript, gets the longitude and latitude and sends that data to the server
and the server just console logs it.

In order to do this we will look at 3 things:
- Routing:
How do you set up a route in express

- JSON:
Adding JSON parsing to express, you need to let the route when it receives data to understand that data as JSON and make
it readable in the code

- fetch()
Need the `fetch()` to specify a POST request, a request that is posting data or sending data to the server.

# Setting up a route
Specify that your route will be a POST request.

[link](http://expressjs.com/en/guide/routing.html)

**Below is just a scheme**
```
// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})

```
Once you have a POST you want to specify both the address, where you want to receive that POST as well as a
callback function, where you will look at the information coming in and send a response back.

**Below is the final code for lesson 2.3**
```
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

```
The callback function takes 2 arguments `request` and `response`, the `request` variable holds everything that is
contained within that `request`, all the data that is being sent, any information you need to know about that
particular client that is sending the information.

`response` is the variable used to send things back to the client.

In `index.html` you set up the code that will send something to the particular endpoint (in `index.js`) with a POST
In `index.html` you set up the code with a `fetch()` function, so you want to fetch your post over to `/api` endpoint.

```
navigator.geolocation.getCurrentPosition(async position => {
    lat = position.coords.latitude;
    document.getElementById('latitude').textContent = lat;
    lon = position.coords.longitude;
    document.getElementById('longitude').textContent = lon;
    //console.log(position);

    //javascript object
    const data = {
        lat,
        lon
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
});

```
In order to send a post you need a 2nd argument `fetch(your endpoint, 2nd argument);`, where our 2nd argument for now is
just a javascript object.

The first property in your `options` object the method that you are using, and that method is a post `method: 'POST'`, by the way there
is a lot of information that can be put under `options` and if you want to look at all the possibilites check it out [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

`body: JSON.stringify(data)` is where you are packaging up all of your data and here you are sending the text as a string text, you are stringifying, taking the javascript object data, and making it into a JSON string.

And because you specifically are sending data in JSON format, so it is useful to specify that in something called a header, and a header
is something that can be packaged along with any POST or Get request that is moving between client and server, and it's a way of adding some
additional meta information, read more [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers), and the one we are using looks like this:
```
headers: {
    'Content-Type': 'application/json'
},
```
So for recap, you get the geolocation data, put it into a javascript object, package it as a POST and send it to the `endpoint`, and in
your server (`index,js`) you receive it.

[`express.json([options])`](http://expressjs.com/en/api.html#express.json) adds to your server the ability to parse any
incoming data as JSON, because you want your server to understand incoming data as JSON.

It is **required** that you complete a request, so we send a response back `response.json(data);`, here you are sending an object back
with some data. And in return in the client file `index.html` you want to receive the response.

`fetch()` returns a [promise](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261).

When response comes back after a fetch call, it comes in as a data stream, so it is up to you to specify how you want to read that, and here you
want to read it as JSON, `const json = await response.json();` handles your response from the server

# LESSON 2.4
# Saving to a Database
A database is for persistence, your ability to store information over the long haul, basically saving information.

You can't do this with client-side code alone, there is something called **Local storage**, and **local storage** is a mechanism for your browser itself to store information locally - but the issue with it is
of you are saving information, when accessing from another client, it won't know the data.

The different clients accross the server needs to be able to share information, and this information needs to be saved at a database that's living on the server.

***You don't need to make your own database nor even keep your database on a server, you can use something called Database-as-a-Service (for example **MongoDB**).***

In this project **NeDB** will be used, it's lightweight, very simple, it's all javascript based, and can be run in **Node**.

Documentation for [NeDB](https://github.com/louischatriot/nedb)
```
npm install nedb   # Put latest version in your package.json
```
After installing **NeDB** in `index.js` we need to `require` that database that we added (import that node package).
`const Datastore = require('nedb');` Here we are getting a function that creates a database/datastore

After we have ***required*** our database we will create our database
`new Datastore('Path to a Filename');`
-->
 `const database = new Datastore('database.db');` 

And the way to save (persist) into the database is by using `database.insert(your desired data);` and the data gets stored as JSON

In `database.db` we have an `_id` for each entry saved, and a key aspect of working with a database, is having every record, every entry into the database be associated with a unique key (`_id`), and ***NeDB*** is generating this code for us to be the particular entry's id.

# LESSON 2.5
# Database Query
Querying data from the database itself. (using Get)

- We need to look at **routing** again, we need a new route.
- We will use the `fetch()` function again, for a `Get` request.
- We need to find functionality in the database system itself **NeDB** that allows you to query the database, to find something. And for this we will use a function called [`find`](https://github.com/louischatriot/nedb#finding-documents)

For our `get` request we for now create a new file called `all.html` which will have a purpose of displaying all data we have from our database.

Ultimately from our client we want to make a `get` request to a route on the server and have that route return all the data from the database.

Below code is our route setup in `index.js`
```
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
});
```
Our `get` request looks like this in `all.html`
```
getData();
async function getData(){
    const response = await fetch('/api');
    const data = await response.json();

    //for each element in our data array
    for(item of data){
        //we are creating html dom elements
        const root = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
                    
        const dateString = new Date(item.timestamp).toLocaleString();
        geo.textContent = `latitude: ${item.latitude}°, longitude: ${item.longitude}°`;
        date.textContent = dateString;

        root.append(geo, date);
        //Finally, append the element to the HTML body
        document.body.append(root);
    }
    console.log(data);
}
```
[someNode.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) is used to avoid code injection which could possibly mess with our project, which would be a risk if we were using `innerHTML`, in general to ***"strengthen"*** security.

We are reusing the `/api` route because calling **fetch** with a **get** to the **api** will be handled in a different function in the server itself.

Our `get` **route** looks as such 
```
app.get('/api', (request, response) => {
    //database.find({}, callback) takes an object, and because we want all data, we leave {} empty, and it also takes a callback with 2 arguments
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
});
```
[`response.end`](https://www.geeksforgeeks.org/express-js-res-end-function/)

# LESSON 2.6
# Saving Images and Base64 encoding
Integrating [**p5.js**](https://p5js.org/get-started/)

***p5.js CDN*** or ***p5.js Content Delivery Network***, is a hosting service that will deliver you content, and the content we want is the **p5.js** library.

The p5 library have several components to it, and for this project we will be using `p5.min.js` because we won't need all from the p5.js and just the minimum of it.

[**Base64**](https://en.wikipedia.org/wiki/Base64) encoding is a method to take some binary data, in our case the image, all the colors of the pixels of the image and convert it to ASCII data, meaning a string of text. So it will be repackaging the same data in a format that's convenient to pass around - In short we will send the webcam image from the client to the server.
The easy way to do that is, as mentioned, by sending a string of text to the server.

# DataSelfieAppTutorial

# GetCurrentWeatherTutorial

# LESSON 3.1
# API calls from Node.js
We will use an external weather API (***[OpenWeatherMap](https://openweathermap.org/)***).

Most of the functionality that we need for this weather app, we have already implemented in our **DatSelfieApp**, so some baseline of code will be used from there.

CORS stands for Cross-Origin Resource Sharing, and it can be enabled or disabled - in short it is whether or not sharing of resources is allowed.

The web fetch api, `fetch`, is part of the client side browser API, if we want to use it from within Node, we need to install a Node package for that `npm install node-fetch`.

`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}` is the url we are using because we are using our current coordinates.