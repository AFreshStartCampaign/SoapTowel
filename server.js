var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

app.set('views', './views');

app.engine('handlebars', handlebars({
  defaultLayout: 'main', 
  layoutsDir: path.join(__dirname,'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  extname: '.html'
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

app.use('/edit_profile',
	stormpath.loginRequired,
	require('./edit_profile')());

app.use('/edit_organization',
  stormpath.loginRequired,
  require('./edit_organization')());

app.use('/edit_charity',
  stormpath.loginRequired,
  require('./edit_charity')());

app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
  app.listen(3000);
});
