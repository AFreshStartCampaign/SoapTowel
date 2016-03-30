module.exports.sendMail = function (req) {
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport(process.env.TRANSPORT_URL);
  var mailOptions = {
    from: '"A Fresh Start" <afs.soaptowel@gmail.com>',
    to: 'afs.soaptowel@gmail.com',
    subject: "Contact Us - from " + req.body.name  + " - " + req.body.email,
    html: "<b>" + req.body.subject + "</b><br>" + req.body.message
  };
  // send mail with defined transport object 
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    return console.log('Message sent: ' + info.response);
  });
};