exports.getManageNotes = (req, res, next) => {
  res.render('admin/index', {
      pageTitle: 'Manage notes',
      path: '/manage-notes'
  });
};
