const getDb = require('../connection/db').getDb;

module.exports = class Note {
  constructor(_noteId, _title, _description, _imageUrl) {
    this._id = _noteId;
    this.title = _title;
    this.description = _description;
    this.imageUrl = _imageUrl;
    this.status = 'unapproved';
  }

  save() {
    const db = getDb();
    return db.collection('notes').insertOne(this);
  }

  saveChanges() {

  }

  static fetchAll(callbackFn, isAdmin) {
    const db = getDb();
    return db.collection('notes').find().toArray();
  }

  static findNoteById(noteId, callbackFn) {

  }

  static delete(noteId) {

  }

  static approve(noteId) {

  }
};
