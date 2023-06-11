const Note = require('../models/note');

exports.getIndex = (req, res, next) => {
  Note.find()
    .then((_notes) => {
      console.log('_notes', _notes);
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
  const note = new Note({
    title: title,
    description: description,
    imageUrl: imageUrl,
    status: 'unapproved',
  });
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
  Note.findById(noteId)
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

  Note.findById(noteId)
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

  Note.findById(noteId)
    .then((_note) => {
      _note.title = title;
      _note.description = description;
      _note.imageUrl = imageUrl;
      _note.status = 'unapproved';
      return _note.save();
    })
    .then(() => {
      res.redirect(`/note/${noteId}`);
    })
    .catch((err) => console.log('error', err));
};

exports.deleteNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Note.findByIdAndRemove(noteId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log('error', err);
    });
};
