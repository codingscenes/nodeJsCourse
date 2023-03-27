const express = require('express');

const router = express.Router();

const notesController = require('../controllers/notes');

router.get('/', notesController.getIndex);

router.get('/add-note', notesController.getAddNote);

router.post('/add-note', notesController.postNote);

router.get('/add-note/:noteId', notesController.getEditNoteDetails);

// handling dynamic params (noteId)
router.get('/note/:noteId', notesController.getNoteDetails);

router.post('/edit-note', notesController.saveEditNote);

router.post('/delete-note', notesController.deleteNote);

module.exports = router;
