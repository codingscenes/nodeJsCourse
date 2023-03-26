const express = require('express');

const path = require('path');

const app = express();

const notesRoutes = require('./routes/notes');
const adminRoutes = require('./routes/admin');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(notesRoutes);
app.use('/admin', adminRoutes);

app.use('/', (req, res, next) => {
  res.send('<h1>Hello!</h1>');
});

app.listen(3000);
