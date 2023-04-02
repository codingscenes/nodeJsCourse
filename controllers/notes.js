const Note = require('../model/Notes');

exports.postNote = (_title, _desc, _imageUrl) => {
    //.build() creates  new object based on the model in javascript and then we need to save it manually
    //.create() does both in one go
    Note.create({
        title: _title,
        description: _desc,
        imageUrl: _imageUrl,
        status: 'Unapproved'
    }).then((result) => {
        console.log('CREATED!');
    }).catch((err) => {
        console.log(err);
    })
}

exports.fetchNotes = () => {
    Note.findAll({raw: true}).then(console.log).catch(console.log)
}


exports.fetchNoteById = (id) => {
    // Note.findByPk(id, {raw: true}).then(res => {
    //     console.log(res);
    // }).catch(console.log)
    Note.findOne({where: {
        id: 1,
    }, raw: true}).then(res => {
        console.log(res);
    }).catch(console.log)
}

exports.updateNoteById = (id) => {
    Note.update({
        title: 'Jabu',
        description : 'Jabu Jawani'
    }, {
        where: {id: id}
    }).then(res => {
        console.log(res);
    })
}

exports.deleteNoteById = (id) => {
    Note.destroy({
        where: {id: id}
    }).then(res => {
        console.log(res);
    })
}