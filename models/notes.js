const fs = require('fs');
const path = require('path');

// nodeJSCourse/data/notes.json
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

module.exports = class Notes {
  constructor(_noteId, _title, _description, _imageUrl) {
    this.noteId = _noteId;
    this.title = _title;
    this.description = _description;
    this.imageUrl = _imageUrl;
  }

  save() {
    this.noteId = Math.round(Math.random() * 1000).toString();
    this.status = 'unapproved';
    getDataFromFile((notes) => {
      notes.push(this);
      fs.writeFile(pathToFile, JSON.stringify(notes), (err) => {
        console.log('err: ', err);
      });
    });
  }
  saveChanges() {
    getDataFromFile((notes) => {
      const noteIndex = notes.findIndex((n) => n.noteId === this.noteId);
      const notesCopy = [...notes];
      notesCopy[noteIndex] = this;
      fs.writeFile(pathToFile, JSON.stringify(notesCopy), (err) => {
        console.log('err: ', err);
      });
    });
  }

  static fetchAll(callbackFn, isAdmin) {
    getDataFromFile((notes) => {
      if (isAdmin) {
        return callbackFn(notes);
      }
      const updatedNotes = notes.filter((n) => n.status === 'approved');
      callbackFn(updatedNotes);
    });
  }

  static findNoteById(id, callbackFn) {
    getDataFromFile((notes) => {
      const note = notes.find((n) => n.noteId === id);
      callbackFn(note);
    });
  }

  static delete(id) {
    getDataFromFile((notes) => {
      const updatedNotes = notes.filter((n) => n.noteId !== id);
      fs.writeFile(pathToFile, JSON.stringify(updatedNotes), (err) => {
        console.log('err: ', err);
      });
    });
  }

  static approve(id) {
    getDataFromFile((notes) => {
      const noteIndex = notes.findIndex((n) => n.noteId === id);
      const notesCopy = [...notes];
      const noteCopy = {
        ...notesCopy[noteIndex],
        status:
          notesCopy[noteIndex].status === 'approved'
            ? 'unapproved'
            : 'approved',
      };
      notesCopy[noteIndex] = noteCopy;
      fs.writeFile(pathToFile, JSON.stringify(notesCopy), (err) => {
        console.log('err: ', err);
      });
    });
  }
};
