const express = require('express');

const router = express.Router();

const noteController = require('../controllers/note');

router.get('/', noteController.getIndex);

router.get('/add-note', noteController.getAddNote);

router.post('/add-note', noteController.postNote);

router.get('/add-note/:noteId', noteController.getEditNoteDetails);

// handling dynamic params (noteId)
router.get('/note/:noteId', noteController.getNoteDetails);

router.post('/edit-note', noteController.saveEditNote);

router.post('/delete-note', noteController.deleteNote);

module.exports = router;
