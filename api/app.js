// import module dependencies
var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');

// import routes
var messageRouter = require('./routes/message-router');

// import development config file
const config = require('./config');

// Initialize express app
var app = express();

// Cors
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Cookie parser Middleware
app.use(cookieParser());

// Routing
app.use('/messages', messageRouter);

// User session
app.use(
  session({
    secret: 'secret token',
    resave: true,
    saveUninitialized: true,
  })
);

// Listen with express server
var port = process.env.PORT || config.app.port;
app.listen(port, () => console.log('Server ready on port ' + port));
