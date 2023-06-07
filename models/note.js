const getDb = require('../connection/db').getDb;
const mongodb = require('mongodb');

module.exports = class Note {
  constructor(_title, _description, _imageUrl, _noteId) {
    this._id = _noteId;
    this.title = _title;
    this.description = _description;
    this.imageUrl = _imageUrl;
    this.status = 'unapproved';
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db.collection('notes').updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        {
          $set: {
            title: this.title,
            description: this.description,
            imageUrl: this.imageUrl,
            status: this.status,
          },
        }
      );
    }
    return db.collection('notes').insertOne(this);
  }

  saveChanges() {
    const db = getDb();
    return db.collection('notes').updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      {
        $set: {
          title: this.title,
          description: this.description,
          imageUrl: this.imageUrl,
          status: this.status,
        },
      }
    );
  }

  static fetchAll(isAdmin) {
    const db = getDb();
    if (isAdmin) {
      return db.collection('notes').find().toArray();
    }
    return db.collection('notes').find({ status: 'approved' }).toArray();
  }

  static findNoteById(noteId) {
    const db = getDb();
    return db
      .collection('notes')
      .find({ _id: new mongodb.ObjectId(noteId) })
      .next();
  }

  static delete(noteId) {}

  static approve(noteId) {}
};
