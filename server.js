var express = require('express');
var app = express();
var port = 3000;

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');


app.use(bodyParser.urlencoded({extended: false}));

var configDB = require('./config/db.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

var api = express.Router();
require('./routes/api.js')(api,passport);
app.use('/api',api);

app.get('/hi', function(req, res){
          res.send("Hi!!!")
});

var User  = require('./models/user');

//inserting a dummy user into database 
app.get('/adduser', function(req, res){
      var newu = new User({
      	name: "ankit",
      	password : "pass"
      });
      newu.save(function(err, doc){
      	if(err) console.log("Error db insertion");
      	else res.json("access_token: "+doc._id)
      })
})


//Handling 404
app.use(function(req, res) {
     res.status(404).render('404');
});


// Handling 500
app.use(function(error, req, res, next) {
     res.status(500).render('500');
});

app.listen(port, function(err){
   if(err) console.log("ERROR WHILE SERVER STARTING");
   else console.log("SERVER IS RUNNING ON PORT "+port);
})