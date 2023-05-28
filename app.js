const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const mongoConnect = require('./connection/db');

const app = express();

const noteController = require('./routes/note');
const adminRoutes = require('./routes/admin');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
