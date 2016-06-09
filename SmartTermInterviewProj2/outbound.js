var client = require('twilio')('ACe196280773749722e994ce8d789df5c9', '3f7a577ade4271ff8f8328f446177307');

client.sendMessage({
    to:'+12029108514', // the number for the phone in your pocket
    from:'+13346030600', // your Twilio number
    body:'Hey Kayan, smart lady, wah fi go a d mall?' // The body of the text message
}, function(error, message) {
    // This callback is executed when the request completes
    if (error) {
        console.error('Damn it.  We couldn\'t send the message');
    } else {
        console.log('Message sent! Message id: '+message.sid);
    }
});
