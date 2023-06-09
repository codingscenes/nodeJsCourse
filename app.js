const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const mongoConnect = require('./connection/db').mongoConnect;
const User = require('./models/user');

const app = express();

const noteController = require('./routes/note');
const adminRoutes = require('./routes/admin');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('648344ea30ef3a412bc653b1')
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log('error', err);
    });
});

app.use(noteController);
app.use('/admin', adminRoutes);

app.use('/', (req, res, next) => {
  res.render('404', {
    pageTitle: 'Page not found',
    path: '',
  });
});

mongoConnect(() => {
  app.listen(3000);
});
