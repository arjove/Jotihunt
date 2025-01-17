/* eslint consistent-return:0 */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const telegram = require('./telegram');
const cors = require('cors');

const models = require('./models');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

const {
  REFRESH_GROUPS,
  REFRESH_HINTS,
  REFRESH_STATUS,
  REFRESH_CARS,
  REFRESH_ARTICLES
} = require('./socket_actions');


app.use(bodyParser.json());
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'authtoken,content-type,application/json, text/plain, */*');
  if(req.method==='OPTIONS')
  {
      res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH');
      return res.status(200).json({});
  }
next()
})
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const {
  Server
} = require("socket.io");
const io = new Server(server, {
  port: 3000,
  cors: {
    origin: ['https://sbjotihunt.nl'],
  }
});

// Setup Socket.io
io.on('connection', function (socket) {
  socket.on(REFRESH_HINTS, function () {
    io.emit(REFRESH_HINTS);
  });
  socket.on(REFRESH_STATUS, function () {
    io.emit(REFRESH_STATUS);
  });
  socket.on(REFRESH_CARS, function () {
    io.emit(REFRESH_CARS);
  });
  socket.on(REFRESH_GROUPS, function () {
    io.emit(REFRESH_GROUPS);
  });
  socket.on(REFRESH_ARTICLES, function () {
    io.emit(REFRESH_ARTICLES);
  });
});

// Make io accessible to our router
app.use(function (req, res, next) {
  req.io = io;
  next();
});


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
require('./api')(app, io);

// Import poller
require('./poller')(io);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'app'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
models.sequelize.sync().then(() => {
  server.listen(port, host, (err) => {
    if (err) {
      return logger.error(err.message);
    }

    // Telegram start web server
    // telegram.sendMessage('Debug', '🖥️ De server is gestart!');
    // telegram.sendMessage('Nieuws', 'Wat een gespam! Bad Dobby!');

    // Connect to ngrok in dev mode
    if (ngrok) {
      ngrok.connect(port, (innerErr, url) => {
        if (innerErr) {
          return logger.error(innerErr);
        }

        logger.appStarted(port, prettyHost, url);
      });
    } else {
      logger.appStarted(port, prettyHost);
    }
  });
});