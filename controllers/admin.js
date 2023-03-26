const Notes = require('../models/notes');

exports.getManageNotes = (req, res, next) => {
  Notes.fetchAll((notes) => {
    res.render('admin/index', {
      pageTitle: 'Manage Notes',
      notes: notes,
      path: '/manage-notes',
    });
  }, true);
};

exports.approveNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Notes.approve(noteId);
  res.redirect('/admin/manage-notes');
};
