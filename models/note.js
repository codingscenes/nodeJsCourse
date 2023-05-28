const fs = require('fs');
const path = require('path');

const getDb = require('../connection/db').getDb;

const pathToFile = path.join(
  path.dirname(require.main.filename),
  'data',
  'notes.json'
);

const getDataFromFile = (callbackFn) => {
  fs.readFile(pathToFile, (err, fileContent) => {
    if (err) {
      return callbackFn([]);
    }
    callbackFn(JSON.parse(fileContent));
  });
};

module.exports = class Note {
  constructor(_noteId, _title, _description, _imageUrl) {
    this._id = _noteId;
    this.title = _title;
    this.description = _description;
    this.imageUrl = _imageUrl;
    this.status = 'unapproved';
  }

  save() {
    console.log(this);
    const db = getDb();
    return db.collection('notes').insertOne(this);
  }

  saveChanges() {
    getDataFromFile((notes) => {
      const noteIndex = notes.findIndex((n) => n.noteId === this.noteId);
      const notesCopy = [...notes];
      notesCopy[noteIndex] = this;
      fs.writeFile(pathToFile, JSON.stringify(notesCopy), (err) => {
        if (err) {
          console.log('error in saving file', err);
        }
      });
    });
  }

  static fetchAll(callbackFn, isAdmin) {
    getDataFromFile((notes) => {
      if (isAdmin) {
        return callbackFn(notes);
      }
      const approvedNotes = notes.filter((n) => n.status === 'approved');
      callbackFn(approvedNotes);
    });
  }

  static findNoteById(noteId, callbackFn) {
    getDataFromFile((notes) => {
      const note = notes.find((_note) => _note.noteId === noteId);
      callbackFn(note);
    });
  }

  static delete(noteId) {
    getDataFromFile((_notes) => {
      const notes = _notes.filter((n) => n.noteId !== noteId);
      fs.writeFile(pathToFile, JSON.stringify(notes), (err) => {
        if (err) {
          console.log('error in saving file', err);
        }
      });
    });
  }

  static approve(noteId) {
    getDataFromFile((notes) => {
      const noteIndex = notes.findIndex((n) => n.noteId === noteId);
      const notesCopy = [...notes];
      const singleNote = notesCopy[noteIndex];
      const notesToApprove = {
        ...singleNote,
        status: singleNote.status === 'approved' ? 'unapproved' : 'approved',
      };
      notesCopy[noteIndex] = notesToApprove;
      fs.writeFile(pathToFile, JSON.stringify(notesCopy), (err) => {
        if (err) {
          console.log('error in saving file', err);
        }
      });
    });
  }
};
