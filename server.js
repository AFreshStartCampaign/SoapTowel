var express = require('express');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var handlebars = require('express-handlebars');
var path = require('path');
var _ = require('lodash');

var routes = require('./routes/index');
var api = require('./routes/api');
var shelter = require('./routes/api/shelter');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use('/', routes);
app.use('/api', api);
app.use('/api/shelter', shelter);

// Stormpath Routes
app.use('/edit_profile',
	stormpath.loginRequired,
	require('./edit_profile')());

app.use('/edit_organization',
  stormpath.loginRequired,
  require('./edit_organization')());

// app.use('/edit_shelter',
//   stormpath.loginRequired,
//   require('./edit_shelter')());

app.on('stormpath.ready',function(){
  console.log('A Fresh Start is running...');
  app.listen(3000);
});

app.use(express.static(__dirname + '/public'));
