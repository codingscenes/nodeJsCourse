const express = require('express');

const notesController = require('../controllers/notes');

const router = express.Router();

router.get('/', notesController.getNotesIndex);

router.get('/add-note', notesController.getAddNote);

router.get('/add-note/:noteId', notesController.editNote);

router.post('/add-note', notesController.postNotes);

router.get('/note/:noteId', notesController.getNoteDetails);

router.post('/edit-note', notesController.savEditedNote);

router.post('/delete-note', notesController.deleteNote);

module.exports = router;
