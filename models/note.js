const getDb = require('../connection/db').getDb;
const mongodb = require('mongodb');

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

  saveChanges() {}

  static fetchAll(isAdmin) {
    const db = getDb();
    if (isAdmin) {
      return db.collection('notes').find().toArray();
    }
    return db.collection('notes').find({ status: 'approved' }).toArray();
  }

  static findNoteById(noteId, callbackFn) {
    const db = getDb();
    return db
      .collection('notes')
      .find({ _id: new mongodb.ObjectId(noteId) })
      .next();
  }

  static delete(noteId) {}

  static approve(noteId) {}
};
