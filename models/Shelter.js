
var mongoose = require('mongoose');
var Address = require('./Address');

var Shelter = mongoose.model('Shelter', {
  avatarUrl:   String,
  name:        String,
  email:       String,
  phone:       String,
  address:     Address,
  bio:         String,
  websiteUrl:  String,
  twitterUrl:  String,
  facebookUrl: String,
  donateUrl:   String
});

module.exports = Shelter;
