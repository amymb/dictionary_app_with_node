var express = require('express');
var router = express.Router();
var pg = require('pg');
var connString = "postgres://localhost/gutenberg_data";

var client = new pg.Client(connString);



router.get('/', function(req, res, next) {
  var books = [];
  pg.connect(connString, function(err, client, done){
    if (err) return console.log(err);
    var query = client.query("SELECT title FROM books");
    query.on('row', function (row){
      books.push(row);
    });
    query.on('end', function(){
      done()
      res.render('titles/index', {books: books});
    });
  });
});

module.exports = router;
