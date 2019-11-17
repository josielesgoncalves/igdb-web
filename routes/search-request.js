var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

var client = restify.createJsonClient({
  url: 'https://internet-games-database.herokuapp.com'
  //url: 'http://localhost:8080'
});

router.get('/', function(req, res, next) {
  client.get('/games/search?value=free%20to%20play&size=5&page=1', function(err, request, response, obj) {
      assert.ifError(err);
    res.end(JSON.stringify(obj, null, 2));
  });   
});


module.exports = router;
