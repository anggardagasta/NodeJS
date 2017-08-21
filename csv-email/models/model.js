const connection = require('./connection');

let model = {
	getAllUsers:function(callback)
	{
		connection.query("SELECT * FROM users", function(err, result, fields)
		{
			if (err) {
				console.log("Query get all users is failed: " + err);
				callback(err);
				// throw err;
			} else {
				callback(null, result);
			}
		})
	}
};

module.exports = model;