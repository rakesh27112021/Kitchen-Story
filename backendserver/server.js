const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//for api requests from angular app cors module needs to be installed and imported here.
const cors = require('cors');

const mongoose = require('./db.js')
// here mongoose is imported for database file and not package.json file

//need routes to be imported here.
const products = require('./routes/products.js');
const admin = require('./routes/admin.js');

const app = express();

var currentSession;
app.use(cookieParser());
var FileStore = require('session-file-store')(session);
app.use(session({
    sessionUserName : "",
    store: new FileStore,
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 3600000, httpOnly:false},
    resave: false
}));

app.use(bodyParser.json())

// this is path of angular application
app.use(cors({origin: 'http://localhost:4200',credentials:true}));

app.listen(3000, () => {
    console.log("Server started at port 3000")
})
/*
app.get('/', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
    console.log(req.sessionID)
    console.log(req.session.views)
  })*/
app.use('/products', products);
app.use('/admin', admin);
//app.use('/adminlogin', adminlogin)
//app.use('/adminservices', adminServices)
//app.use('/enduserservices', enduserservices)