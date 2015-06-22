var express = require('express');
var router = express.Router();
var pg = require('pg');
var connString = process.env.PG_CONNECTION_STRING;


var client = new pg.Client(connString);

router.get('/', function(req, res, next) {
  var books = [];
  pg.connect(connString, function(err, client, done){
    if (err) return console.log(err);
    var query = client.query("SELECT title, id FROM books");
    query.on('row', function (row){
      console.log(row);
      books.push(row);
    });
    query.on('end', function(){
      done()
      res.render('titles/index', {books: books});
    });
  });
});


module.exports = router;
