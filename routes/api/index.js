var express = require('express');
// var _ = require('lodash');
var router = express.Router();
var mailer = require('../mailer');

// { term, zipcode, radius }
router.get('/search', function(req, res) {
  console.log('req.query: ', req.query);
  res.send({
    success: true,
    data: {
      shelters: [
        {
          _id: 123,
          avatarUrl: 'http://www.lthc.net/wp-content/themes/lthc/images/logo.png',
          name: 'Lafayette Transitional Housing Center',
          phone: '765-423-4880',
          website: 'http://www.lthc.net/',
          address: '123 Main Street\nLafayette, IN 47909',
          bio: 'Lafayette Transitional Housing Center, Inc. is a non-profit organization which began in 1989 to develop housing, offer supportive services, and other opportunities to foster self-sufficiency for the homeless, particularly families with children, in our community.',
          twitterUrl: 'https://twitter.com/LafTransHsg',
          facebookUrl: 'https://www.facebook.com/Lafayette-Transitional-Housing-Center-Inc-114590221904879/',
          email: 'lthc@lthc.net',
          donateUrl: 'http://www.lthc.net/#homecontent'
        },
        {
          _id: 456,
          avatarUrl: 'http://www.lthc.net/wp-content/themes/lthc/images/logo.png',
          name: 'Some other place',
          phone: '123-456-7890',
          website: 'http://www.lthc.net/',
          address: '123 Main Street\nLafayette, IN 47909',
          bio: 'Lafayette Transitional Housing Center, Inc. is a non-profit organization which began in 1989 to develop housing, offer supportive services, and other opportunities to foster self-sufficiency for the homeless, particularly families with children, in our community.',
          twitterUrl: 'https://twitter.com/LafTransHsg',
          facebookUrl: 'https://www.facebook.com/Lafayette-Transitional-Housing-Center-Inc-114590221904879/',
          email: 'lthc@lthc.net',
          donateUrl: 'http://www.lthc.net/#homecontent'
        }
      ]
    }
  });
});

router.post('/email/send', function (req, res) {
  var result = require('../mailer.js').sendMail(req);
  res.send(result);
});

module.exports = router;
