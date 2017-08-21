const csv = require('./controllers/csv');
const email = require('./controllers/email');

csv.saveIntoCSV();
email.sendEmail();
