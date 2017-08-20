var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

/* GET home page. */
router.get('/:id?', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  if (req.params.id) {
  	Users.getUserById(req.params.id, function(err, result) {
  		if (err) {
  			res.json(err);
  		} else {
  			res.json(result);
  		}
  	});
  } else {
  	Users.getAllUsers(function(err, result) {
  		if (err) {
  			res.json(err);
  		} else {
  			res.json(result);
  		}
  	});
  }
});
//POST user
router.post('/', function(req, res, next){
	Users.addUsers(req.body, function (err, count){
		if (err) {
			res.json(err);
		} else {
			res.json(req.body);
		}
	});
});
//DELETE user
router.delete('/:id', function(req, res, next){
	Users.deleteUser(req.params.id, function(err){
		if (err) {
			res.json(err);
		} else {
			res.json({message:'User with id ' + req.params.id + ' is deleted successfully'});
		}
	});
});
//UPDATE user
router.put('/:id', function(req, res, next){
	Users.updateUser(req.params.id, req.body, function(err){
		if (err) {
			res.json(err);
		} else {
			res.json({message:'User with id ' + req.params.id + ' is update successfully', request: req.body});
		}
	})
});

module.exports = router;
