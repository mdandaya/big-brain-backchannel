///////////////////////////////////////////////////////
// Import module dependencies and routes
///////////////////////////////////////////////////////
var express = require('express');
var http = require('http');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var socketIO = require('socket.io');
var messageRouter = require('./routes/message-router');
var path = require('path');

// Import development config file
var config = null;
try {
  config = require('./config');
} catch (ex) {
  console.log('no config file app.js');
}

// Initialize express app
var app = express();

// Initialize server
var server = http.createServer(app);

///////////////////////////////////////////////////////
// Middleware
///////////////////////////////////////////////////////

// CORS
app.use(cors());

// Body parser
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Cookie parser
app.use(cookieParser());

// User session
app.use(
  session({
    secret: 'secret token',
    resave: true,
    saveUninitialized: true,
  })
);

// Socket.io middleware makes io available as req.io in all request handlers
var io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

///////////////////////////////////////////////////////
// Routing
///////////////////////////////////////////////////////

// Express routers
app.use('/api/messages', messageRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

// Start server on environment port or config port
var port = process.env.PORT || config.app.port;
server.listen(port, () => console.log('Server ready on port ' + port));
