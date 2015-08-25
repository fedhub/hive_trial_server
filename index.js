var express    = require("express");
var app        = express();
var server     = require('http').createServer(app);
var path       = require('path');
var bodyParser = require('body-parser');
var cookie_parser = require('cookie-parser');
var session = require('express-session');
var Parse      = require('parse').Parse;

Parse.initialize("YmjyJjNGA1QcCYQQ0C479gArZzWKBEgcwBe3kt7K", "NRJGn0tlpDY2By3mRPhlGcDFb0dclEQedm993YjV");
var query = new Parse.Query(Parse.User);
query.find({
    success: function(users) {
        for (var i = 0; i < users.length; ++i) {
            console.log(users[i].get('username'));
        }
    }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use middleware
app.use(express.static(path.join(__dirname, 'includes')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie_parser());
app.use(session({
    secret: 'anystringoftext',
    saveUninitialized: true, // saves transactions like db even if server is down
    resave: true //resaves even if nothing has changed - consider when performance is important
}));

// define route
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

//app.use(require('./queries'));
app.get('/', function(req, res){
    res.send('hello');
    console.log(req.cookies);
    console.log('=====================');
    console.log(req.session);
});

var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log("app http ready on port "+port);
});