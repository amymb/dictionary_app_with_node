var pg = require('pg');
var connString = "postgres://amybertken:password@localhost/gutenberg_data"

var client = new pg.Client(connString);

client.connect();

var query = client.query('CREATE TABLE paragraphs(id SERIAL PRIMARY KEY, paragraphText TEXT not null, bookId INTEGER not null)')

query.on('end', function(){client.end(); });
