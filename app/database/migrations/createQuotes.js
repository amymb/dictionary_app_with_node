var pg = require('pg');
var pgpLib = require('pg-promise');
var connString = "postgres://amybertken:password@localhost/bookslist"

var client = new pg.Client(connString);

client.connect();

var query = client.query('CREATE TABLE quotes(id SERIAL PRIMARY KEY, quote VARCHAR(600) not null, book_id INTEGER not null)')
query.on('end', function(){client.end(); });
