var BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = function(passport) {

var User  = require('../models/user');

passport.use(new BearerStrategy({},
		function(token, done){
			console.log("token "+token);
			User.findOne({ _id: token }, function(err, user){
				if(!user)
					return done(null, false);
				return done(null, user);
			});
		}));
};