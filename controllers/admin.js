const Notes = require('../models/notes');

exports.getManageNotes = (req, res, next) => {
  Notes.findAll({ raw: true })
    .then((result) => {
      res.render('admin/index', {
        pageTitle: 'Manage notes',
        path: '/manage-notes',
        notes: result,
      });
    })
    .catch((err) => {
      console.log('err in fetching admin notes');
    });
};

exports.approveNote = (req, res, next) => {
  const noteId = req.body.noteId;
  Notes.findOne({
    where: {
      id: noteId,
    },
    raw: true,
  })
    .then((result) => {
      const currentStatus = result.status;
      let newStatus = 'Unapproved';
      if (currentStatus === 'Unapproved') {
        newStatus = 'Approved';
      }
      return Notes.update(
        {
          status: newStatus,
        },
        {
          where: {
            id: noteId,
          },
        }
      );
    })
    .then((result) => {
      console.log('UPDATED: ', result);
      res.redirect('/admin/manage-notes');
    })
    .catch((err) => {
      console.log(err);
    });
};
