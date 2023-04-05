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
      res.redirect('/');
    })
    .catch((err) => {
      console.log('Failed: Record Inserted');
    });
};

exports.getNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  Notes.findOne({
    where: {
      id: noteId,
    },
    raw: true,
  })
    .then((result) => {
      res.render('notes/note', {
        pageTitle: 'View Note Details',
        path: '',
        note: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // find only using Primary key
  // Notes.findByPk(noteId, { raw: true })
  //   .then((result) => {
  //     res.render('notes/note', {
  //       pageTitle: 'View Note Details',
  //       path: '',
  //       note: result,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.getEditNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  const isEdit = req.query.isEditing;
  Notes.findOne({
    where: {
      id: noteId,
    },
    raw: true,
  })
    .then((result) => {
      res.render('notes/add-note', {
        pageTitle: 'Editing a note',
        path: '',
        note: result,
        isEditMode: isEdit,
      });
    })
    .catch((err) => {
      console.log(er);
    });
};

exports.saveEditNote = (req, res, next) => {
  const reqBody = req.body;
  const { title, description, imageUrl, noteId } = reqBody;
  Notes.update(
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
    },
    {
      where: {
        id: noteId,
      },
    }
  )
    .then((result) => {
      res.redirect(`/note/${noteId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Notes.destroy({
    where: {
      id: noteId,
    },
  })
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};
