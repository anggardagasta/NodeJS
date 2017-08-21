const model = require('../models/model');
const json2csv = require('json2csv');
const fs = require('fs');

let saveIntoCSV = function ()
{
	model.getAllUsers(function(err, result)
	{
		if (err) {
			console.log("CSV Failed");
		} else {
			console.log("Building CSV ...");
			try {
		        let fields = ['id', 'name', 'address', 'email', 'phone'];
		        let csv = json2csv({data:result,fields:fields});
		        fs.writeFile('files/Result.csv', csv, function(err)
			        {
			          	if (err) {
			          		throw err;
			          	}
			          	console.log('Result.csv saved');
			        }
			    );
		    } catch (err) {
		        // Errors are thrown for bad options, or if the data is empty and no fields are provided. 
		        // Be sure to provide fields if it is possible that your data array will be empty. 
		        console.error(err);
		    }
		}
	});	
};

module.exports = {saveIntoCSV:saveIntoCSV};