'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./utils/pass');
const app = express();
const session = require('express-session');
const port = 3000;

// don't do this in the project
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};

// don't do this in the project
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const username = 'foo';
const password = 'bar';

app.use(cookieParser());
app.use(session({
  secret: 'jotain',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60*60*24},
}));

app.use(passport.initialize());
app.use(passport.session()); // don't do this in the project

app.set('views', './views');
app.set('view engine', 'pug');

// don't do this in the project
app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
});

// don't do this in the project
app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});

// don't do this in the project
app.get('/', (req, res) => {
  res.render('home');
});

// don't do this in the project
app.get('/home', (req, res) => {
  res.render('home');
});

// don't do this in the project
app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

// don't do this in the project
app.get('/setCookie/:clr', ((req, res) => {
  res.cookie('color', req.params.clr, {httpOnly: true}).send('cookie set');
}));

// don't do this in the project
app.get('/deleteCookie', ((req, res) => {
  res.clearCookie('color');
  res.send('cookie deleted');
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
