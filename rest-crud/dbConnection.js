const mysql = require('mysql');
let connection = mysql.createPool({
		host:'localhost',
		user:'root',
		password:'password',
		database:'nodejs'
	});
module.exports = connection;