

module.exports = function(router, passport){

	router.use(passport.authenticate('bearer', { session: false }));
     

	router.get('/testAPI', function(req, res){
		res.json({ SecretData: 'abc123' });
	});


	

}