var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public')); //grab all static files in the public folder


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://halesunnylodgejm%40gmail.com:silver!22@smtp.gmail.com');
// create reusable client object with twilio SID and token
var client = require('twilio')('ACe196280773749722e994ce8d789df5c9', '3f7a577ade4271ff8f8328f446177307');

// setup e-mail data with unicode symbols
app.get('/', function(req, res){
	res.sendFile('index.html', {root: './public/'});
}); 

app.get('/send',function(req,res){
	//for sending the EMAIL
var mailOptions = {
    from: '"Kayan Hales" <halesunnylodgejm@gmail.com>', // sender address
    to: req.query.to, // list of receivers
    subject: req.query.subject, // Subject line
    text: req.query.text, // plaintext body
    html: req.query.text // html body
};

	//for sending the SMS
var mailOptions2 ={
		to: req.query.tophone,//my phone
		from:'+13346030600',//twilio phone
		body:req.query.text //message to send
};

//send SMS with defined client object
client.sendMessage(mailOptions2, function(error, message) {
    // This callback is executed when the request completes
    if (error) {
        console.error('Damn it.  We couldn\'t send the message');
    } else {
        console.log('Message sent! Message id: '+message.sid);
    }
});


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