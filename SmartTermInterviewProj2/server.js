var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://halesunnylodgejm%40gmail.com:silver!22@smtp.gmail.com');

// setup e-mail data with unicode symbols
app.get('/', function(req, res){
	res.sendFile('index.html', {root: './public/'});
	//res.sendFile('style.css', {root: './public/'});
}); 

app.get('/send',function(req,res){
var mailOptions = {
    from: '"Kayan Hales" <halesunnylodgejm@gmail.com>', // sender address
    to: req.query.to, // list of receivers
    subject: req.query.subject, // Subject line
    text: req.query.text, // plaintext body
    html: req.query.text//'<b>Hello World</b>' // html body
};


// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
});

app.listen(3000,function(){
	console.log("express Started on Port 3000");
});
