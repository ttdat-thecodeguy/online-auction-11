var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'online.auction.11team@gmail.com',
      pass: 'igfkfaqpvvualtim'
    }
});

// var defaultMail = {
//     from: 'nhatrovn.nhom4@gmail.com',
//     text: '11onlineauctionteam',
// };

module.exports ={
    send: function(mail)
    {
        transporter.sendMail(mail, function(error, info){
            if(error) return console.log(error);
            console.log('mail sent:', info.response);
        });
    }
};