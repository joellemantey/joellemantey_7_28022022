var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./identifier.sqlite', (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(function() {
    db.each("SELECT * FROM user", function(err, row) {
        console.log(row.id + ": " + row.nom);
    });
});

module.exports = db;