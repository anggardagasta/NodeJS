const nodemailer = require('nodemailer');
const date = new Date();

let dateTime = function()
{
    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    let min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    let sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    let day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + "_" + hour + ":" + min + ":" + sec;
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'yourmail@gmail.com',
        pass: 'emailpassword'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Anggarda Gasta" <yourmail@gmail.com>', // sender address
    to: 'anggarda.gasta.p@mail.com, anggarda.gasta.p@examplmail.com', // list of receivers
    subject: 'Send CSV ' + dateTime(), // Subject line
    text: 'Test Send CSV ' + dateTime(), // plain text body
    html: 'Test Send CSV ' + dateTime(), // html body
    attachments: [
        {   // file on disk as an attachment
            filename: 'Result.csv',
            path: './files/Result.csv' // stream this file
        }    ]
};

let sendEmail = function() {
	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	});
};

module.exports = {sendEmail:sendEmail};