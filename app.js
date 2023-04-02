const express = require("express");

const sequelize = require("../mysql/db/sql/sequelize");

const noteController = require("./controllers/notes");
const Note = require("./model/Notes");
const User = require("./model/User");

const app = express();

app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    next();
  });
});

app.use("/create", (req, res, next) => {
  req.user.createNote({
    title: "test1",
    description: "test1 is a ",
    imageUrl: "http://xx.com",
    status: "Unapproved",
  });
  res.send("<h1>Done</h1>");
});

app.use("/getNote/:id", (req, res, next) => {
  const id = +req.params.id;
  req.user
    .getNotes({
      where: id,
      raw: true,
    })
    .then((user) => {
      console.log(user);
      res.send(JSON.stringify(user));
    });
  // req.user.createNote({
  //   title: "test1",
  //   description: "test1 is a ",
  //   imageUrl: "http://xx.com",
  //   status: "Unapproved",
  // });
});

app.use("/create", (req, res, next) => {
  req.user.createNote({
    title: "test1",
    description: "test1 is a ",
    imageUrl: "http://xx.com",
    status: "Unapproved",
  });
  res.send("<h1>Done</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello World!</h1>");
});

Note.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});

User.hasMany(Note);
//sequelize.sync({force: true})
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    // noteController.postNote('Test2', 'Test2 description', 'https://xyz.com/test.jpg');
    // noteController.fetchNotes()
    // noteController.fetchNoteById(1);
    // noteController.updateNoteById(1)
    // noteController.deleteNoteById(1);

    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Rohit Sharma",
        email: "xyz@gmail.com",
        password: "12345",
      });
    }
  })
  .then((user) => console.log(user))
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
