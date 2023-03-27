const Notes = require('../models/notes');

exports.getManageNotes = (req, res, next) => {
  Notes.fetchAll((_notes) => {
    res.render('admin/index', {
      pageTitle: 'Manage notes',
      path: '/manage-notes',
      notes: _notes,
    });
  }, true);
};

exports.approveNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Notes.approve(noteId);
  res.redirect('/admin/manage-notes');
};
