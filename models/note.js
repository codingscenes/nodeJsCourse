const { ObjectId } = require("mongodb");

const getDb = require("../connection/db").getDb;

class Note {
  constructor(title, description, imageUrl, id) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOps;
    if (this._id) {
      dbOps = db.collection("notes").updateOne(
        {
          _id: new ObjectId(this._id),
        },
        { $set: this }
      );
    } else {
      dbOps = db.collection("notes").insertOne(this);
    }
    return dbOps
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("notes").find().toArray();
  }

  static findById(noteId) {
    const db = getDb();
    return db
      .collection("notes")
      .find({ _id: new ObjectId(noteId) })
      .next()
      .then((note) => {
        console.log(note);
        return note;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Note;
