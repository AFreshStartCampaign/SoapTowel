var express = require('express');
var stormpath = require('express-stormpath');
var handlebars = require('express-handlebars');
var path = require('path');

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

app.get('/mission_and_vision', function(req, res) {
  res.render('mission_and_vision');
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

app.get('/start_a_student_chapter', function(req, res) {
  res.render('start_a_student_chapter');
});

app.get('/become_a_chapter_advisor', function(req, res) {
  res.render('become_a_chapter_advisor');
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

app.get('/static_home', function(req, res) {
  res.render('static_home');
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
