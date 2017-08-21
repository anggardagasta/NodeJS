const mysql = require('mysql');
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'nodejs'
});

connection.connect(function(err)
	{
	    if (err) {
	      console.log("Database connection is failed")
	      // throw err
	    } else {
	      console.log("Database connection is success")
	    }
	}
);

module.exports = connection;