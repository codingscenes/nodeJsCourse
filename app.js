const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const sequelize = require('./connection/database');

const app = express();

const notesRoutes = require('./routes/notes');
const adminRoutes = require('./routes/admin');

const Note = require('./models/note');
const User = require('./models/user');
const Tag = require('./models/tag');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    next();
  });
});

app.use(notesRoutes);
app.use('/admin', adminRoutes);

app.use('/', (req, res, next) => {
  res.render('404', {
    pageTitle: 'Page not found',
    path: '',
  });
});

// Define one-to-many association between Note and Tag
User.hasMany(Note);

Note.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});

// Define many-to-many association between Note and Tag
Note.belongsToMany(Tag, { through: 'NoteTags' });
Tag.belongsToMany(Note, { through: 'NoteTags' });

// recommended use sequelize migration (production env)
// data base migration
sequelize
  .sync()
  .then((result) => {
    console.log('Sync Success!');
    return User.findByPk(1);
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
    return Tag.findAll();
  })
  .then((tags) => {
    if (!tags || !tags.length) {
      const tags = [
        'programming',
        'web development',
        'database',
        'networking',
        'algorithm',
        'Computer',
      ];

      tags.forEach((tagName) => {
        Tag.create({ name: tagName })
          .then((res) => {
            console.log('Tag Created!');
          })
          .catch((err) => {
            console.log('Failed to create a tag!');
          });
      });
    }
  })
  .catch((err) => console.log(err));

app.listen(3000);
