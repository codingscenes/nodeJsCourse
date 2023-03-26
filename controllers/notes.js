const Notes = require('../models/notes');

exports.getNotesIndex = (req, res, next) => {
  Notes.fetchAll((notes) => {
    res.render('notes/index', {
      pageTitle: 'Notes',
      notes: notes,
      path: '/',
    });
  }, false);
};

exports.getAddNote = (req, res, next) => {
  res.render('notes/add-notes', {
    pageTitle: 'Add a new note!',
    path: '/add-note',
    isEdit: '',
  });
};

exports.postNotes = (req, res, next) => {
  const reqBody = req.body;
  const { title, description, imageUrl } = reqBody;
  const note = new Notes(null, title, description, imageUrl);
  note.save();
  res.redirect('/');
};

exports.getNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  Notes.findNoteById(noteId, (note) => {
    res.render('notes/note', {
      pageTitle: 'Add a new note!',
      note: note,
      path: '',
    });
  });
};

exports.editNote = (req, res, next) => {
  const noteId = req.params.noteId;
  const isEdit = req.query.isEditing;
  Notes.findNoteById(noteId, (note) => {
    res.render('notes/add-notes', {
      pageTitle: 'Edit a note!',
      note: note,
      path: '',
      isEdit: isEdit,
    });
  });
};

exports.savEditedNote = (req, res, next) => {
  const reqBody = req.body;
  const { title, description, imageUrl, noteId } = reqBody;
  const note = new Notes(noteId, title, description, imageUrl);
  note.saveChanges();
  res.redirect(`/note/${noteId}`);
};

exports.deleteNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Notes.delete(noteId);
  res.redirect('/');
};
