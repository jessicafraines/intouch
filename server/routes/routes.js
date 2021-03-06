'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    home           = require('../controllers/home'),
    user           = require('../controllers/user'),
    contacts       = require('../controllers/contacts');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(security.authenticate);
  app.use(debug.info);

  app.get('/home', home.index);
  app.post('/contacts', contacts.create);
  app.get('/contacts', contacts.index);
  app.post('/contacts/:id', contacts.update);
  app.delete('/contacts/:id', contacts.deleteContact);
  app.get('/contacts/:id', contacts.show);
  app.post('/login', user.loginUser);
  app.post('/register', user.registerUser);
  app.delete('/logout', user.logout);

  console.log('Express: Routes Loaded');
};

