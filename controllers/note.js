const Note = require('../models/note');

exports.getIndex = (req, res, next) => {
  Note.fetchAll(false, req.user._id)
    .then((_notes) => {
      res.render('notes/index', {
        pageTitle: 'Notes',
        path: '/',
        notes: _notes,
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
};

exports.getAddNote = (req, res, next) => {
  res.render('notes/add-note', {
    pageTitle: 'Add a note',
    path: '/add-note',
    isEditMode: '',
  });
};

exports.postNote = (req, res, next) => {
  const reqBody = req.body;
  const { title, description, imageUrl } = reqBody;
  const note = new Note(title, description, imageUrl, null, req.user._id);
  note
    .save()
    .then((result) => {
      console.log(result);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  Note.findNoteById(noteId)
    .then((_note) => {
      console.log('single', _note);
      res.render('notes/note', {
        pageTitle: 'View Note Details',
        path: '',
        note: _note,
      });
    })
    .catch((err) => {
      console.log('error', err);
    });
};

exports.getEditNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  const isEdit = req.query.isEditing;

  Note.findNoteById(noteId)
    .then((_note) => {
      res.render('notes/add-note', {
        pageTitle: 'Editing a note',
        path: '',
        note: _note,
        isEditMode: isEdit,
      });
    })
    .catch((err) => console.log('error', err));
};

exports.saveEditNote = (req, res, next) => {
  const reqBody = req.body;
  const { title, description, imageUrl, noteId } = reqBody;

  const note = new Note(title, description, imageUrl, noteId, req.user._id);
  note
    .save()
    .then(() => {
      res.redirect(`/note/${noteId}`);
    })
    .catch((err) => console.log('error', err));
};

exports.deleteNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Note.delete(noteId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log('error', err);
    });
};
