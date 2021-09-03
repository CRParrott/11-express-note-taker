const router = require('express').Router();
const path = require('path');

// GET notes page
router.get('/notes', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET all remaing files
router.get('*', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;