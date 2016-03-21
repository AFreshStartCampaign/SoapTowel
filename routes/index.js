var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

router.get('/my_profile', function(req, res) {
  res.render('my_profile', {
    title: 'My Profile'
  });
});

router.get('/about_us', function(req, res) {
  res.render('about_us', {
    title: 'About Us'
  });
});

router.get('/mission', function(req, res) {
  res.render('mission');
});

router.get('/our_values', function(req, res) {
  res.render('our_values');
});

router.get('/meet_the_team', function(req, res) {
  res.render('meet_the_team');
});

router.get('/afs_supporters', function(req, res) {
  res.render('afs_supporters');
});

router.get('/join_our_team', function(req, res) {
  res.render('join_our_team');
});

router.get('/student_chapter', function(req, res) {
  res.render('student_chapter');
});

router.get('/chapter_advisor', function(req, res) {
  res.render('chapter_advisor');
});

router.get('/basic_necessities', function(req, res) {
  res.render('basic_necessities');
});

router.get('/donate', function(req, res) {
  res.render('donate');
});

router.get('/monetary', function(req, res) {
  res.render('monetary');
});

router.get('/advocate', function(req, res) {
  res.render('advocate');
});

router.get('/get_involved', function(req, res) {
  res.render('get_involved', {
    title: 'Get Involved'
  });
});

router.get('/campaign', function(req, res) {
  res.render('campaign', {
    title: 'Soap & Towel Campaign'
  });
});

router.get('/locate_shelter', function(req, res) {
  var data, isProfileAdmin, shelters;
  // TODO: Get shelter by id
  // TODO: Get logged in user
  // TODO: See if logged in user is admin of this shelter
  // TODO: Get news feed for shelter

  // TODO: Temporary fixture for testing
  shelters = [
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
  ];

  data = {
    results: shelters
  };

  console.log('data: ', data);

  res.render('locate_shelter', {
    title: 'Locate Shelter',
    // cssFilename: 'locate_shelter',
    data: data
  });
});

router.get('/shelter/:id', function(req, res) {
  var data, isProfileAdmin, shelter;
  // TODO: Get shelter by id
  // TODO: Get logged in user
  // TODO: See if logged in user is admin of this shelter
  // TODO: Get news feed for shelter

  // TODO: Temporary fixture for testing
  shelter = {
    _id: req.params.id,
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
  };

  data = _.merge(shelter, {
    posts: [
      {
        publishedAt: new Date('Sun Mar 06 2016 00:00:00 GMT-0500 (EST)').toJSON(),
        title: 'My Second Post',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus assumenda fugiat cum, blanditiis repudiandae aliquam molestias pariatur, eum soluta saepe consequuntur iste quo natus adipisci quidem vitae, dolorem eligendi? Architecto eos quas sequi dolorem natus, ducimus facilis perspiciatis quae quaerat suscipit, incidunt nam magnam iure laudantium cum vero nihil. Maiores.'
      },
      {
        publishedAt: new Date('Sun Mar 05 2016 00:00:00 GMT-0500 (EST)').toJSON(),
        title: 'My First Post',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus assumenda fugiat cum, blanditiis repudiandae aliquam molestias pariatur, eum soluta saepe consequuntur iste quo natus adipisci quidem vitae, dolorem eligendi? Architecto eos quas sequi dolorem natus, ducimus facilis perspiciatis quae quaerat suscipit, incidunt nam magnam iure laudantium cum vero nihil. Maiores.'
      }
    ]
  });

  data = _.merge(data, {
    isProfileAdmin: true,
    cssFilename: 'shelter_profile'
  });

  isProfileAdmin = data.isProfileAdmin;
  data.posts = data.posts.map(function (p) {
    p.isProfileAdmin = isProfileAdmin;
    return p;
  });

  data.posts = _.sortBy(data.posts, 'publishedAt');

  console.log('data: ', data);

  res.render('shelter_profile', data)
})

router.get('/contact', function(req, res) {
  res.render('contact', {
    title: 'Contact Us'
  });
});

module.exports = router;
