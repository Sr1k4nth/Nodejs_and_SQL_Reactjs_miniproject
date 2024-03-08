const mysql = require('mysql');

// Local MySQL DB connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'crevel@123',
  database : 'basic_crud'
});

// Connect to the database
dbConn.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Database Connected!');
});

// Error handling for connection errors
dbConn.on('error', function(err) {
  console.error('Database connection error:', err);
});

module.exports = dbConn;