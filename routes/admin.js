const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/manage-notes', adminController.getManageNotes);

router.post('/approve', adminController.approveNote);

module.exports = router;
