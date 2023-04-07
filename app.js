const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const sequelize = require('./connection/database');

const app = express();

const notesRoutes = require('./routes/notes');
const adminRoutes = require('./routes/admin');

const Note = require('./models/note');
const User = require('./models/user');

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

// magic association method
User.hasMany(Note);

Note.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});

// recommended use sequelize migration (production env)
// data base migration
sequelize
  .sync()
  .then((result) => {
    console.log('Sync Success!');
    return User.findByPk(2);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: 'Mohit Sharma',
        email: 'abc@gmail.com',
        password: '123456',
      });
    }
  })
  .then((user) => {
    console.log('user created', user);
  })
  .catch((err) => console.log(err));

app.listen(3000);
