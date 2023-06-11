const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');

const User = require('./models/user');

const app = express();

const noteController = require('./routes/note');
const adminRoutes = require('./routes/admin');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6485ddb727040311e33830f4')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log('error', err));
});

app.use(noteController);
app.use('/admin', adminRoutes);

app.use('/', (req, res, next) => {
  res.render('404', {
    pageTitle: 'Page not found',
    path: '',
  });
});

mongoose
  .connect(
    'mongodb+srv://test2020:XM1ElzQcr9Ka9hPB@cluster0.cfo4b9s.mongodb.net/notestakingapp?retryWrites=true&w=majority'
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Rohit',
          email: 'xyz@abc.com',
        });
        user.save();
      }
    });

    console.log('Connected to Mongoose!');
    app.listen(3000);
  })
  .catch((err) => console.log('Error in connection', err));
