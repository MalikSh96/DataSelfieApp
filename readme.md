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
We will use an external weather API (**[OpenWeatherMap](https://openweathermap.org/)**).

Most of the functionality that we need for this weather app, we have already implemented in our **DataSelfieApp**, so some baseline of code will be used from there.

CORS stands for Cross-Origin Resource Sharing, and it can be enabled or disabled - in short it is whether or not sharing of resources is allowed.

The web fetch api, `fetch`, is part of the client side browser API, if we want to use it from within Node, we need to install a Node package for that `npm install node-fetch`.

`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}` is the url we are using because we are using our current coordinates.

# LESSON 3.2
# Open Air Quality API in Node.js
**Purpose**: Working with multiple API's within one application, and for this we will use [OpenAQ](https://openaq.org/#/?_k=3x7g40).

**OpenAQ** is an open data, open source project that aggregates a lot of different air quality readings from many different sources.

[API](https://docs.openaq.org/) is an api with a variety of different endpoints for you to request that air quality information.

The ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) **issue** with using OpenAQ, is that you can encounter no results at all, because OpenAQ does not have any information regarding specific locations.

If you encounter an issue just use [this](https://api.openaq.org/v1/latest?coordinates=40.73,-73.99) hardcoded url which gives you the OpenAQ information in New York.

**pm** data stands for **particulate matter** data (particle pollution).

Another ![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) **issue** with using OpenAQ is that the data isn't necessarily **real-time** data.

**As things stands** I will be trying to use another open air quality API such as [**AirVisual**](https://www.iqair.com/dashboard), but this will be a ***work in progress***.

**OBS** Since both OpenAQ and AirVisual is not working (OpenAQ doesn't provide for all locations and I am still waiting for an API key from AirVisual) - We will instead be using [**Weatherbit**](https://www.weatherbit.io/api/airquality-current).

With **Weatherbit** I get provided an API key which I then make use of in the following endpoint 
`https://api.weatherbit.io/v2.0/current/airquality?lat=${lat}&lon=${lon}&key=${weather_api_key}`

# LESSON 3.3
# Mapping Database Entries with Leaflet.js
Every time the ***check in*** button gets pressed we want to save all of the information into a database, so that we can go onto a **View Checkins** page and view all of the records ever saved plotted on a map.

[Leaflet.js](https://leafletjs.com/) is referenced under `public` -> `checkins` -> `index.html` where I make use of a script.

In `logs.js` we have a little bit of code to specify the tiles from OpenStreetMap and place the map with a zoom level one, latitude and longitude zero, zero, right there on the page.

The data from the database gets loaded with the `getData()` (`logs.js`) function by making a fetch call to the API endpoint.

# LESSON 3.4 
# Hiding API Keys with Environment Variables (dotenv)
We want to look at one important thing here, and that's how to stop our API keys from just sitting right there exposed in our code, if we want to make our porject a public source project, ie. exposed to the public.

And the way we will handle this is with an ***environment variable***, and an environment variable is a variable.
The thing is we don't want this specific ***"varibale"*** in our code but rather we want it stored in the environment, we want it to be something that is set within the operating system or whatever framwork or system we are using to run software itself.

For all this we will be using a ***node*** package called [`dotenv`](https://www.npmjs.com/package/dotenv) -> `npm install dotenv`.
Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.

It's a convention for environment variables to be stored either in a **dotenv** file or through some other mechanism based on whatever server you're using, but **not** to be published when the code is published.

Since this project is published to **GitHub** with some omitted files, such as our `.env` file, you can make use of `.env_sample` to understand what our `.env` file contains and from there make your own changes and refactoring the `.env_sample` file into `.env` and replace it with your own ***api keys***.

**OBS** Since we can't use ***dotenv*** with client side code, we can't make use of the environment variables inside our `.env` file.
And since we also make use of our API keys in our client side code `sketch.js` we need to solve the issue of just having our API keys being visible inside `sketch.js`. To solve this issue we make use of **modules**, in short we split our coding up into small packages and then reference them different places in different coding coding parts, or:
***A module is just a file. One script is one module. As simple as that.***
***Modules can load each other and use special directives export and import to interchange functionality, call functions of one module from another one***

***- **export** keyword labels variables and functions that should be accessible from outside the current module.*** 
***- **import** allows the import of functionality from other modules.***

We have created a file `keys.js` where we create an object which holds our API keys, and in it we export our `api_keys` object which contains our needed variables, `export {api_keys}`. 
```
const api_keys = {
    OpenWeatherMap: 'MY OPENWEATHERMAP API KEY',
    Weatherbit: 'MY WEATHERBIT API KEY'//,
    //ENV: 'api_keys'
};

export {api_keys};
```
Inside our `sketch.js` file we then make a call to import our `keys.js` file using the following: 
`import { api_keys } from './keys.js';`
The import directive loads the module by path `./keys.js` relative to the current file, and assigns exported object `api_keys` to the corresponding variable.
Where we specifically asks it to import our `{api_keys}` and by such we can make a reference to to our API keys as illustrated also in `sketch.js`

```
const api_key = api_keys.OpenWeatherMap;

const weather_api_key = api_keys.Weatherbit;
```
And since modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute `<script type="module">`
In `public/index.html` -> `<script src="sketch.js" type="module"></script>`

Links used:
- [Modules](https://javascript.info/modules-intro)
- [GuideModules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- When import doesn't [work](https://stackoverflow.com/questions/37624819/es2015-import-doesnt-work-even-at-top-level-in-firefox) - even at top level
