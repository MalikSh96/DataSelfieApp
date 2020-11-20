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
# DataSelfieAppTutorial
