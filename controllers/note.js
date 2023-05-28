const Note = require('../models/note');

exports.getIndex = (req, res, next) => {
  Note.fetchAll((_notes) => {
    res.render('notes/index', {
      pageTitle: 'Notes',
      path: '/',
      notes: _notes,
    });
  }, false);
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
  const note = new Note(null, title, description, imageUrl);
  note.save();
  res.redirect('/');
};

exports.getNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  Note.findNoteById(noteId, (_note) => {
    res.render('notes/note', {
      pageTitle: 'View Note Details',
      path: '',
      note: _note,
    });
  });
};

exports.getEditNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  const isEdit = req.query.isEditing;
  Note.findNoteById(noteId, (_note) => {
    res.render('notes/add-note', {
      pageTitle: 'Editing a note',
      path: '',
      note: _note,
      isEditMode: isEdit,
    });
  });
};

exports.saveEditNote = (req, res, next) => {
  const reqBody = req.body;
  const { title, description, imageUrl, noteId } = reqBody;

  const note = new Note(noteId, title, description, imageUrl);
  note.saveChanges();
  res.redirect(`/note/${noteId}`);
};

exports.deleteNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Note.delete(noteId);
  res.redirect('/');
};
