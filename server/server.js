var express = require("express");
var session = require('express-session');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'get it right get it tight',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))

const flash = require('express-flash');
app.use(flash());
var mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, "../client/views"));
app.set('view engine', 'ejs');

var connect = require('../server/config/routes.js')(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
})




