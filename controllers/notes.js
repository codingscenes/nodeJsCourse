const Notes = require('../models/notes');

exports.getIndex = (req, res, next) => {
  Notes.findAll({ raw: true })
    .then((result) => {
      console.log(result);
      res.render('notes/index', {
        pageTitle: 'Notes',
        path: '/',
        notes: result,
      });
    })
    .catch((err) => {
      console.log(err);
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
  Notes.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    status: 'Unapproved',
  })
    .then((result) => {
      console.log('Record Inserted');
    })
    .catch((err) => {
      console.log('Failed: Record Inserted');
    });
  res.redirect('/');
};

exports.getNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  Notes.findNoteById(noteId, (_note) => {
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
  Notes.findNoteById(noteId, (_note) => {
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

  const note = new Notes(noteId, title, description, imageUrl);
  note.saveChanges();
  res.redirect(`/note/${noteId}`);
};

exports.deleteNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Notes.delete(noteId);
  res.redirect('/');
};
