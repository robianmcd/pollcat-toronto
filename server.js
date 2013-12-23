/**
 * Module dependencies.
 */
var newRelic = require('newrelic');
var express = require('express');
var http = require('http');
var path = require('path');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

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
if (server.get('env') == 'development') {
    server.use(express.errorHandler());
}

//Connect to Mongo collections
var questionDb;
var candidateDb;

MongoClient.connect('mongodb://pcadmin:pctoronto@paulo.mongohq.com:10023/app17991090', function(err, db) {
    questionDb = db.collection('questions');
    candidateDb = db.collection('candidates');
});


//Setup endpoints
server.get('/', function(req, res) {
    res.sendfile("public/indexCacheBusted.html");
});

server.get('/api/questions', function(req, res) {
    res.header("Cache-Control", "max-age=0,no-cache,no-store");
    questionDb.find().toArray(function(err, items) {
        res.send(items);
    });
});

server.get('/api/candidates/:ward', function(req, res) {
    res.header("Cache-Control", "max-age=0,no-cache,no-store");

    //Find candidates that are from the specified ward or are running for mayor
    candidateDb.find(
        {$or: [
            {ward: parseInt(req.params.ward)},
            {type: 0},
            //TODO: There are some temporary sample candidates for councilor so that each ward has some candidates.
            //These should be removed when there is real data.
            {sample: true}
        ]})
        .toArray(function(err, items) {
            res.send(items);
        });
});

//Start Server
http.createServer(server).listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});