const getDb = require('../connection/db').getDb;
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

module.exports = class Note {
  constructor(_title, _description, _imageUrl, _noteId, _userId) {
    this._id = _noteId;
    this.title = _title;
    this.description = _description;
    this.imageUrl = _imageUrl;
    this.status = 'unapproved';
    this.userId = new ObjectId(_userId);
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db.collection('notes').updateOne(
        { _id: new ObjectId(this._id) },
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
      { _id: new ObjectId(this._id) },
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

  static fetchAll(isAdmin, userId) {
    const db = getDb();
    if (isAdmin) {
      return db.collection('notes').find().toArray();
    }
    return db
      .collection('notes')
      .find({ userId: new ObjectId(userId), status: 'approved' })
      .toArray();
  }

  static findNoteById(noteId) {
    const db = getDb();
    return db
      .collection('notes')
      .find({ _id: new ObjectId(noteId) })
      .next();
  }

  static delete(noteId) {
    const db = getDb();
    return db.collection('notes').deleteOne({ _id: new ObjectId(noteId) });
  }

  static approve(noteId) {
    const db = getDb();
    let status = 'unapproved';

    return Note.findNoteById(noteId)
      .then((_note) => {
        if (_note.status === 'unapproved') {
          status = 'approved';
        }
      })
      .then(() => {
        return db
          .collection('notes')
          .updateOne(
            { _id: new ObjectId(noteId) },
            {
              $set: {
                status: status,
              },
            }
          )
          .next();
      })
      .catch((err) => console.log('error', err));
  }
};
