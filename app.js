const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const sequelize = require('./connection/database');

const app = express();

const notesRoutes = require('./routes/notes');
const adminRoutes = require('./routes/admin');
const Notes = require('./models/notes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(notesRoutes);
app.use('/admin', adminRoutes);

app.use('/', (req, res, next) => {
  res.render('404', {
    pageTitle: 'Page not found',
    path: '',
  });
});

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));

app.listen(3000);
