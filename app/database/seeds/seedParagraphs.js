var pg = require('pg');
var connString = "postgres://amybertken:password@localhost/gutenberg_data";
var pgp = pgpLib()
var db = pgp(connString)
var MAX_POOL_SIZE = 25
pg.defaults.poolSize = MAX_POOL_SIZE;

var async = require('async');


var books = []


pg.connect(connString, function(err,client,done){
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  var query = client.query("SELECT id, text FROM books")
  query.on('row', function (row){
    books.push(row);
  });
  query.on('end', function(){
    done()
    books.filter(function(book){
      if (book.id >= 110 && book.id <=112){return true;}}).forEach(function(book){
        var paragraphs = book.text.split("\n\n");
        var book_id = book.id;
        var queryLength = paragraphs.length;
        paragraphs.forEach(function(paragraph){
          var values = [paragraph, book_id];
          var queryText = "INSERT INTO paragraphs (paragraphText, bookId) VALUES($1, $2) RETURNING id"
          client.query(queryText, values, function(err, result) {
            if (err) {
              console.log(err);
            }else{
              console.log('row inserted with id: ' + result.rows[0].id);
          }
        });
      });
    });
  });
});
