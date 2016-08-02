var routes = require('./routes/');
var express = require('express');
var swig = require('swig');
swig.setDefaults({ cache: false });

var app = express();
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

var server = app.listen(3000);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/', routes);
// app.use(function(req,res,next) {
// 	res.render( 'index', {title: 'Hall of Fame', people: people} );
// });
