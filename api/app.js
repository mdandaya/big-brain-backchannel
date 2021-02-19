// Import module dependencies
var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');

// Import routes
var messageRouter = require('./routes/message-router');

// Import development config file
var config = null;
try {
  config = require('./config');
} catch (ex) {
  console.log('no config file app.js');
}

// Initialize express app
var app = express();

// CORS
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'));
});

// Listen with express server
var port = process.env.PORT || config.app.port;
app.listen(port, () => console.log('Server ready on port ' + port));
