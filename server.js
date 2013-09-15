
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var server = express();

// all environments
server.set('port', process.env.PORT || 3000);

server.use(express.logger('dev'));
//Lets you use server.put() and server.delete(). Without this you can only user server.post() and server.get().
server.use(express.methodOverride());
//Having this line before any express.static lines will mean that routes set up with server.get, etc. will override
//static files with the same name. http://stackoverflow.com/questions/12695591/node-js-express-js-how-does-app-router-work
server.use(server.router);
//I think this sets the icon seen beside the page title in a browser tab. You can pass a path into favicon.
server.use(express.favicon());
//This is needed to use the body of a post request.
server.use(express.bodyParser());
//Make the public folder the context root
server.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == server.get('env')) {
  server.use(express.errorHandler());
}

server.get('/', function(req, res) {
    res.sendfile("public/index.html");
});

http.createServer(server).listen(server.get('port'), function(){
  console.log('Express server listening on port ' + server.get('port'));
});
