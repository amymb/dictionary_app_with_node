var pg = require('pg');
var connString = "postgres://amybertken:password@localhost/gutenberg_data";
var pgpLib = require('pg-promise');
var pgp = pgpLib()
var db = pgp(connString)
var promise = require('promise')
var async = require('async')



db.waterfall([
  function (client, cb) {
    client.query("SELECT text, id FROM books");
  },
  function (client, results, cb) {
    var table1_id = results.rows[0].id;
    var values = [ table1_id, table2_values[0], table2_values[1] ];
            client.query("INSERT INTO Table2 (table1_id, col1, col2) VALUES ($1, $2, $3) RETURNING id", values, cb);
        },
    ], cb);
