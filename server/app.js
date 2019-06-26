var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dataRouter = require('./routes/data');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/data', dataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


function generateRoom() {
  return (Math.floor(new Date() / 1000)).toString(36);
}

// socket handling
var forestSockets = io.of('/forest');
var controllerSockets = io.of('/controller');

var forests = [];

forestSockets.on('connection', function(socket) {
  console.log('forest socket connected');

  forestID = generateRoom();

  forests.push(forestID);
  socket.join(forestID)
  socket.emit('id', {'id': forestID});

  socket.on('disconnect', function() {
    forests.splice(forests.indexOf(this), 1);
  });
});

controllerSockets.on('connection', function(socket) {
  console.log('controller socket connected');
  
  socket.on('disconnet', function() {
    console.log('controller socket disconnect')
  });

  socket.on('join-room', function(data) {
    socket.join(data.forestID);
  });

  socket.on('create-tree', function(data) {
    forestSockets.to(data.forestID).emit('create-tree', {'leaf':data.leaf, 'branch':data.branch, 'objectID':data.objectID});
  });
});

module.exports = {app: app, server: server};
