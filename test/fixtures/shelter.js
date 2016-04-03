var Shelter = require('../../models/Shelter');

module.exports = function () {
  var testShelter = new Shelter({
    avatarUrl: 'http://www.lthc.net/wp-content/themes/lthc/images/logo.png',
    name: 'Lafayette Transitional Housing Center',
    phone: '765-423-4880',
    websiteUrl: 'http://www.lthc.net/',
    address: {
      street: '123 Main Street',
      city: 'Lafayette',
      state: 'IN',
      zip: '47909'
    },
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
};
