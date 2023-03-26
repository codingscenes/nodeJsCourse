exports.getIndex = (req, res, next) => {
  res.render('notes/index', {
    pageTitle: 'Notes',
    path: '/',
  });
};

exports.getAddNote = (req, res, next) => {
  res.render('notes/add-note', {
    pageTitle: 'Add a note',
    path: '/add-note',
  });
};
