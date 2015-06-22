var express = require('express');
var router = express.Router();
var pg = require('pg');
var connString = "postgres://localhost/gutenberg_data";
var client = new pg.Client(connString)
/* GET home page. */



router.get('/paragraphs', function(req, res) {
  var results = [];
  pg.connect(connString, function(err, client, done){
    if (err) return console.log(err);
    var query = client.query("SELECT * FROM paragraphs");
    query.on('row', function (row){
      results.push(row);
    });
    query.on('end', function(){
      client.end();
      return res.json(results);
    });
    if(err) {
      console.log(err);
    }
  });
});

router.get('/api/:search', function(req, res, next) {
  console.log(req.params)
  pg.connect(connString, function(err, client, done) {
    var results = [];
    if (err) return console.log(err);
    var query = client.query("SELECT paragraphtext, bookid, upvotes, downvotes, title, year FROM paragraphs INNER JOIN books ON books.id = paragraphs.bookid WHERE to_tsvector('english', paragraphtext) @@to_tsquery('english', $1)", [req.params.search]);
    query.on('row', function (row){
      results.push(row);
    });
    query.on('end', function() {
      done();
      var uniq = results.reduce(function(accum, value){if (accum.map(function(v){accum.paragraphtext}).indexOf(value.paragraphtext) > -1); accum.push(value); return accum }, [])
      var longEnough = uniq.filter(function(value){return value.paragraphtext.split(" ").length >= 12});
      return res.json(longEnough);
    });
  });
});


router.post('/paragraphs/:id/upvotes', function(req, res){
  pg.connect(connString, function(err, client, done){
    if (err) return console.log(err);
    var query = client.query("UPDATE paragraphs SET upvotes = upvotes + 1 WHERE id = $1", [req.params.id]);
    query.on('end', function(){
      done();

    });
  });
});

router.post('/paragraphs/:id/downvotes', function(req, res){
  pg.connect(connString, function(err, client, done){
    if (err) return console.log(err);
    var query = client.query("UPDATE paragraphs SET downvotes = downvotes + 1 WHERE id = $1", [req.params.id]);
    query.on('end', function(){
      done();    
    });
  });
});


router.get('/books', function(req, res){
  var books = [];
  pg.connect(connString, function(err, client, done){
    if (err) return console.log(err);
    var query = client.query("SELECT title, year, id FROM books");
    query.on('row', function(row){
      books.push(row);
    });
    query.on('end', function(){
      client.end();
      return res.json(books);
    });
    if(err){
      console.log(err);
    }
  });
});

router.get('/slider', function(req, res){
  res.render('partials/slider.jade')
});


router.get('/quote', function(req, res){
  res.render('partials/quote.jade')
});

router.get('/', function(req, res) {
  res.render('index.jade'); // load our public/index.html file
});



module.exports = router;
