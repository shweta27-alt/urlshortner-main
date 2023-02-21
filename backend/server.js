const bodyParser = require('body-parser');
const express = require('express');
const app = new express();
const cors = require('cors')
const mongo = require('./mongoose.init');
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
mongo.connect();


app.use(require('cookie-parser')());
app.use(bodyParser.json({ limit: '2mb' }));

//cors to allow origin and methods
app.use(
    cors({
      origin:[ "http://localhost:8081","http://localhost:5080","https://webchatapplication-chatify.fly.dev","http://localhost:8080"],
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
      sameSite: 'none'
    })
  );

require('./app/routes')(app);

//other than above routes
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});


app.listen(8080,console.log('server started on PORT 8080'))
 
