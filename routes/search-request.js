var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

var client = restify.createJsonClient({
  //url: 'https://internet-games-database.herokuapp.com'
  url: 'http://localhost:8080'
});

router.get('/', function(req, res, next) {
  client.get('/games/search', {params: {value: 'free to play', size: 1, page: 1}}, function(err, request, response, obj) {
    console.log('mostrando parametros inicio');
    
    
console.log(request.params.value);
//console.log(size);
//console.log(page);
//console.log('mostrando parametros fim');


    //response.send(request.params)
      //assert.ifError(err);
    //res.end(JSON.stringify(obj, null, 2));
  });   
});


module.exports = router;
