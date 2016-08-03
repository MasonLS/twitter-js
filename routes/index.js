var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(express.static('./public'));

// router.get('/stylesheets/style.css', function(req, res, next){
// 	res.sendFile(__dirname + '/stylesheets/style.css');
// });

module.exports = function (io) {
  router.get('/', function (req, res) {
  var name = '';
  var tweets = tweetBank.list();
  tweets.sort(function(a,b) {return b['id'] - a['id']; })
  res.render( 'index', { tweets: tweets, thisName: name, showForm: true } );
});

router.post('/tweets', function(req, res){
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  io.sockets.emit('newTweet', {name: name, content: text });
  res.redirect('/');
});

router.get('/users/:name', function(req, res) {
	var name = req.params.name;
	// console.log(name);
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list, thisName: name, showForm: true});
});

router.get('/tweets/:id', function(req, res) {
	var id = +req.params.id;
	var rightTweet = tweetBank.find( {id: id} );
	res.render( 'index', { tweets: rightTweet });
});
	return router;
};