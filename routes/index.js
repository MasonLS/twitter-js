var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.use(express.static('./public'));

// router.get('/stylesheets/style.css', function(req, res, next){
// 	res.sendFile(__dirname + '/stylesheets/style.css');
// });

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.get('/users/:name', function(req, res) {
	var name = req.params.name;
	// var nameFinder = new RegExp(name, 'gi');
	// var list = tweetBank.find( function(ele) {return nameFinder.test(ele['name'])} );
    var list = tweetBank.find( {name: name} );
	res.render( 'index', { tweets: list } );
});

router.get('/tweets/:id', function(req, res) {
	var id = +req.params.id;
	var rightTweet = tweetBank.find( {id: id} );
	res.render( 'index', { tweets: rightTweet });
});

module.exports = router;