var db = require('../dbConnection');
var Users = {
	getAllUsers:function(callback) {
		return db.query("SELECT	* FROM users", callback);
	},
	getUserById:function(id, callback) {
		return db.query("SELECT * FROM users WHERE id = ?", [id], callback);
	},
	addUsers:function(Users, callback) {
		return db.query("INSERT INTO users (name, address, email, phone) VALUES (?,?,?,?)", [Users.name, Users.address, Users.email, Users.phone], callback)
	},
	deleteUser:function(id, callback) {
		return db.query("DELETE FROM users WHERE id = ?", [id], callback);
	},
	updateUser:function(id, User, callback) {
		return db.query("UPDATE users SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?", [User.name, User.address, User.email, User.phone, id], callback)
	}
};
module.exports = Users;