const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/manage-notes', adminController.getManageNotes);

router.post('/approve', adminController.approveNote);

module.exports = router;
