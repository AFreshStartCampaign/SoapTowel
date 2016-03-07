var express = require('express');
var stormpath = require('express-stormpath');
var handlebars = require('express-handlebars');
var path = require('path');
var _ = require('lodash');

var app = express();

app.set('views', './views');

app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname,'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  extname: '.handlebars'
}));
app.set('view engine', 'handlebars');

app.use(stormpath.init(app, {
  website: true,
  expand: {
    customData: true
  }
}));

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});

app.get('/my_profile', function(req, res) {
  res.render('my_profile', {
    title: 'My Profile'
  });
});

app.get('/about_us', function(req, res) {
  res.render('about_us', {
    title: 'About Us'
  });
});

app.get('/mission', function(req, res) {
  res.render('mission');
});

app.get('/our_values', function(req, res) {
  res.render('our_values');
});

app.get('/meet_the_team', function(req, res) {
  res.render('meet_the_team');
});

app.get('/afs_supporters', function(req, res) {
  res.render('afs_supporters');
});

app.get('/join_our_team', function(req, res) {
  res.render('join_our_team');
});

app.get('/student_chapter', function(req, res) {
  res.render('student_chapter');
});

app.get('/chapter_advisor', function(req, res) {
  res.render('chapter_advisor');
});

app.get('/basic_necessities', function(req, res) {
  res.render('basic_necessities');
});

app.get('/donate', function(req, res) {
  res.render('donate');
});

app.get('/monetary', function(req, res) {
  res.render('monetary');
});

app.get('/advocate', function(req, res) {
  res.render('advocate');
});

app.get('/get_involved', function(req, res) {
  res.render('get_involved', {
    title: 'Get Involved'
  });
});

app.get('/campaign', function(req, res) {
  res.render('campaign', {
    title: 'Soap & Towel Campaign'
  });
});

app.get('/locate_shelter', function(req, res) {
  res.render('locate_shelter', {
    title: 'Locate Shelter'
  });
});

app.get('/shelter/:id', function(req, res) {
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

app.get('/contact', function(req, res) {
  res.render('contact', {
    title: 'Contact Us'
  });
});

app.use('/edit_profile',
	stormpath.loginRequired,
	require('./edit_profile')());

app.use('/edit_organization',
  stormpath.loginRequired,
  require('./edit_organization')());

app.use('/edit_shelter',
  stormpath.loginRequired,
  require('./edit_shelter')());

app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
  app.listen(3000);
});

app.use(express.static(__dirname + '/public'));
