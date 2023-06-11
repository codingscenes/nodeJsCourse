const Note = require('../models/note');

exports.getManageNotes = (req, res, next) => {
  Note.find()
    .then((_notes) => {
      res.render('admin/index', {
        pageTitle: 'Manage notes',
        path: '/manage-notes',
        notes: _notes,
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
};

exports.approveNote = (req, res, next) => {
  const noteId = req.body.noteId;
  let status = 'unapproved';
  Note.findById(noteId)
    .then((_note) => {
      if (_note.status === 'unapproved') {
        status = 'approved';
      }
      _note.status = status;
      return _note.save();
    })
    .then(() => {
      res.redirect('/admin/manage-notes');
    })
    .catch((err) => console.log('error', err));
};
