const util = require('util');
const fs = require('fs');

// Generating unique id
const uuidv4 = require('uuid/v4');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Save {
    read() {
        return readFileAsync('db/db.json', 'utf-8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            const parseNotes;

            try {
                parseNotes = [].concat(JSON.parse(notes))
            } catch (err) {
                parseNotes = [];
            }

            return parseNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw Error("title and text cannot be blank");
        }

        // Adding unique id using uuid
        const newNote = { title, text, id: uuidv4() };

        // Get note, add new note, update notes, return the new note
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }

    removeNote(id) {
        // Get all notes, remove the note with the given id, write the filtered notes
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Save();