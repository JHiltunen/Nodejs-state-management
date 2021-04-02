'use strict';
const express = require('express');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

// don't do this in the project
app.get('/setCookie/:clr', ((req, res) => {
  res.cookie('color', req.params.clr, {httpOnly: true}).send('cookie set');
}))

// don't do this in the project
app.get('/deleteCookie', ((req, res) => {
  res.clearCookie('color');
  res.send('cookie deleted');
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
