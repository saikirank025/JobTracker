var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('jobs')

app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', function(req, res) {
	var stuff = {};
	db.all("SELECT * FROM start", function(err, data1) {
		db.all("SELECT * FROM progress", function(err, data2) {
			db.all("SELECT * FROM done", function(err, data3) {
				stuff['start'] = data1;
				stuff['progress'] = data2;
				stuff['done'] = data3;
				res.render('index.ejs', stuff);
			});
		});
	});
});

app.get('/deleteall/:table', function(req, res) {
	var query = "DELETE FROM " + req.params.table;
	// console.log(query);
	db.run(query);
	res.redirect('/');
});

app.get('/delete/', function(req, res) {
	var query = "DELETE FROM " + req.query.table + " WHERE name='" + req.query.name + "'";
	// console.log(query);
	db.run(query);
	res.redirect('/');
});

app.get('/insert/', function(req, res) {
	var query = "INSERT INTO " + req.query.table + " VALUES ('" + req.query.name + "'," + req.query.weight + ")";
	// console.log(query);
	db.run(query);
	res.redirect('/');
});

app.listen(1825, function() {
	console.log('listening on port 1825');
});
