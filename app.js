var express = require('express');

var app = express();

var server = app.listen(3000);

app.use('/secret', function(req,res,next) {
	for (var prop in res) {
		console.log(prop);
	}
})

//add status code later
app.use(function(req,res,next) {
	console.log(req['method'], req['path'], res.statusCode);
	next()
});

app.get('/', function(req, res, next){
	res.send('whatever');
});

