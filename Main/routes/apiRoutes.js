const router = require('express').Router();
const save = require('../db/store');


// GET all notes
router.get('/notes', async (req, res) => {
    try {
        save.getNotes()
        .then((notes) => {
            return res.json(notes);
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new note
router.post('/notes', async (req, res) => {
    try {
        save.newNote(req.body)
        .then((note) => res.status(200).json(note))
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a note
router.delete('/notes/:id', async (req, res) => {
    try {
        save.deleteNote(req.params.id)
        .then(() => res.status(404).json({ ok: true }))
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;