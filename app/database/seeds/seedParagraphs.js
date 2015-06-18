var pg = require('pg');
var connString = "postgres://amybertken:password@localhost/gutenberg_data";
var pgpLib = require('pg-promise');
var pgp = pgpLib()
var db = pgp(connString)
var promise = require('promise')
var MAX_POOL_SIZE = 25
pg.defaults.poolSize = MAX_POOL_SIZE;

var async = require('async');

// async.waterfall([
//   pg.connect(connstring, function (err, client, done) {
//          if (err) {
//              return cb(err);
//          }
//     }),
//     function(client, callback) {
//       callback(client.query('SELECT title, id FROM books'))
//     },
//     function (results, callback) {
//       return results.rows.count
//     }
// ], function(err, results) {
//     console.log(results);
// });
//
// function factory(idx) {
//     if (idx < paragraphs.length) {
//       paragraph.forEach(function(paragraph))
//       var values = [paragraph, book_id];
//       return this.none("INSERT INTO paragraphs (paragraphText, bookId) VALUES($1, $2) RETURNING id", values);
//     }
//
//
// db.tx(function () {
//     return promise.all([
//         this.none('drop table if exists test'),
//         this.none('create table test(id serial, name text)'),
//         this.sequence(factory), // key method
//         this.one('select count(*) from test')
//     ]);
// })
//   .then(function (data) {
//   }, function (reason) {
//         // error
//     });
//
//
//
//
//
// pg.connect(connString, function(err,client,done){
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//
// function factory(m) {
//     if (m < books.length) {
//         return this.none('insert into test(name) values($1)', 'name-' + idx);
//     }
// }
//
// db.tx(function () {
//     return promise.all([
//         this.query('SELECT id, text FROM books'),
//         this.none('create table test(id serial, name text)'),
//         this.sequence(factory(data[0])), // key method
//         this.one('select count(*) from test')
//     ]);
// })
//     .then(function (data) {
//         console.log("COUNT:", data[3].count);
//     }, function (reason) {
//         console.log("REASON:", reason);
//     });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// pg.connect(connString, function(err,client,done){
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//
//   var release = function() {
//     done();
//     i++
//     if (i < paragraphs.length)
//       insertQ();
//   };
//
//     var insertQ = function(books) {
//       var books = [];
//       var query = client.query("SELECT id, text FROM books");
//       query.on('row', function (row){
//         books.push(row);
//       });
//       query.on('end', function(){
//         done();
//         books.forEach(function(book){
//           var book_id = book.id;
//           var paragraphs =  book.text.split('\n');
//           paragraphs.forEach(function(paragraph){
//             var values = [paragraph, book_id];
//             var queryText = "INSERT INTO paragraphs (paragraphText, bookId) VALUES($1, $2) RETURNING id"
//             client.query(queryText, values, function(err, result){
//               if (err) {
//                 console.log(err);
//               }else{
//                 console.log('row inserted with id: ' + result.rows[0].id);
//               }
//             release();
//           })
//         });
//       });
//     });
//   };
//   done();
//   for (i = 0; i < MAX_POOL_SIZE; i++){
//     insertQ();
//   }
// });



// db.tx(function(t){
//   return promise.all([
//     t.query("SELECT text, id FROM books")]
//   );
// })
// .then(function (data){
//     return booksArray = data[0];
//     function factory(idx) {
//       if (idx < 1000000) {
//         return this.none('insert into test(name) values($1)', 'name-' + idx);
//       }
//   }, function(reason){
//     console.log(reason)
//   });


// db.tx(function () {
//   var queries = [
//     this.query("SELECT text, id FROM books"),
//   ];
//     for (var i = 1; i <= 100; i++) {
//         queries.push(this.none("insert into users(name) values($1)", "name-" + i));
//     }
//     queries.push(
//         this.tx(function () {
//             return this.tx(function(){
//                 return this.one("select count(*) from users");
//             });
//         }));
//     return promise.all(queries);
// })
// .then(function (data) {
//     console.log(data); // printing transaction result;
// }, function (reason) {
//     console.log(reason); // printing why the transaction failed;
// })
//
// var books=[];
// db.query("select text, id from books")
//     .then(function (data) {
//       data.forEach(function(book){
//         books.push(book);
//         db.tx(function(){
//           return this.sequence(factory)
//         })
//       })
//     }, function (reason) {
//         console.log(reason); // print error;
//     });


// function factory(idx) {
//     // create and return a promise object dynamically,
//     // based on the index passed (parameter idx);
//     if (idx < 1000000) {
//         return this.none('insert into test(name) values($1)', 'name-' + idx);
//     }
//     // returning null or nothing indicates the end of the sequence;
//     // throwing an error will result in a reject;
// }
//
// db.tx(function () {
//     return this.sequence(factory);
// })
//     .then(function (data) {
//         // success;
//     }, function (reason) {
//         // error
//     });
//
//
// db.connect()
//   .then(function(obj){
//     sco = obj;
//     return sco.query("select text, id from books")
//   }).then(function(data){
//       return sco.tx(function(t){
//   .then(function(data){
//     console.log(data); // display all the user details;
//   }, function(reason){
//     console.log(reason); // display reason why the call failed;
//   })
//   .done(function(){
//     if(sco){
//         sco.done(); // release the connection, if it was successful;
//       }
//   });


//         for (var i = 0; i < books.length; i++) {
//           var values = [paragraph, book_id];
//           var queryText = "INSERT INTO paragraphs (paragraphText, bookId) VALUES($1, $2) RETURNING id"
//           queries.push(ctx.none(queryText, values));
//         }
//         return promise.all(queries);
//       });
//     }
//     function insertAll(idx) {
//       if (!idx) {
//         idx = 0;
//       }
//       return insertRecords(100000)
//         .then(function () {
//             if (idx >= 9) {
//                 return promise.resolve('SUCCESS');
//             } else {
//                 return insertAll(++idx);
//             }
//         }, function (reason) {
//             return promise.reject(reason);
//         });
// }

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
