var express = require('express');
// var _ = require('lodash');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/afs');

var Shelter = mongoose.model('Shelter', {
  avatarUrl:   String,
  name:        String,
  phone:       String,
  website:     String,
  address:     String,
  bio:         String,
  twitterUrl:  String,
  facebookUrl: String,
  email:       String,
  donateUrl:   String
});

var testShelter = new Shelter({
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
});

testShelter.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Created test shelter.');
  }
});

router.get('/:id', function(req, res) {
  var shelterId;

  console.log('req.params: ', req.params);

  if(!req.params || !req.params.id) {
    res.send({ success: false, msg: 'Must provide a valid shelter id.' });
    return;
  }

  console.log('req.params.id: ', req.params.id);

  shelterId = req.params.id;

  res.send({
    _id: shelterId,
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
  });
});

router.post('/', function(req, res) {
  var shelter, shelterId;

  console.log('req.query: ', req.query);

  if(!req.query) {
    res.send({ success: false, msg: 'Must provide a query object.' });
    return;
  }

  shelter = req.query;

  new Shelter(shelter).save(function (err, shelter) {
    if(err) res.send({ success: false, msg: 'Error on save:' + err, errmsg: err });
    else    res.send(shelter._id);
  });
});

module.exports = router;
