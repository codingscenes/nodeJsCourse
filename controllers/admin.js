const Note = require('../models/note');

exports.getManageNotes = (req, res, next) => {
  Note.fetchAll((_notes) => {
    res.render('admin/index', {
      pageTitle: 'Manage notes',
      path: '/manage-notes',
      notes: _notes,
    });
  }, true);
};

exports.approveNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Note.approve(noteId);
  res.redirect('/admin/manage-notes');
};
