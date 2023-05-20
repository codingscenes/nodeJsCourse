const { ObjectId } = require("mongodb");
const Note = require("../models/note");

exports.getIndex = (req, res, next) => {
  Note.fetchAll().then((_notes) => {
    console.log(_notes);
    res.render("notes/index", {
      pageTitle: "Notes",
      path: "/",
      notes: _notes,
    });
  }, false);
};

exports.getAddNote = (req, res, next) => {
  res.render("notes/add-note", {
    pageTitle: "Add a note",
    path: "/add-note",
    isEditMode: "",
  });
};

exports.postNote = (req, res, next) => {
  const reqBody = req.body;
  const { title, description, imageUrl } = reqBody;
  const note = new Note(title, description, imageUrl);
  note.save().then((result) => {
    console.log(result);
    console.log("Note Created!");
    // res.redirect("/");
  });
};

exports.getNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  Note.findById(noteId)
    .then((_note) => {
      res.render("notes/note", {
        pageTitle: "View Note Details",
        path: "",
        note: _note,
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditNoteDetails = (req, res, next) => {
  const noteId = req.params.noteId;
  const isEdit = req.query.isEditing;
  Note.findById(noteId).then((_note) => {
    res.render("notes/add-note", {
      pageTitle: "Editing a note",
      path: "",
      note: _note,
      isEditMode: isEdit,
    });
  });
};

exports.saveEditNote = (req, res, next) => {
  const reqBody = req.body;
  const { title, description, imageUrl, noteId } = reqBody;

  const note = new Note(
    noteId,
    title,
    description,
    imageUrl,
    new ObjectId(noteId)
  );
  note
    .save()
    .then((result) => {
      console.log("UPDATED NOTES");
      res.redirect(`/note/${noteId}`);
    })
    .catch((err) => console.log(err));
};

exports.deleteNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Note.delete(noteId);
  res.redirect("/");
};
