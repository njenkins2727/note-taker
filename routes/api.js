const router = require('express').Router();
const { ok } = require('assert');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const dbPath = path.join(__dirname, '..', 'db', 'db.json');

function getNotes(){
    //read the content of db json 
  const content =  fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(content) || [];
}

  function saveNote(title, text){
    //add new note data to db json 
    const newNote = {
        id: uuid.v4(),
        title: title,
        text: text,
    }
    //add new note data to db.json
    //retrieve the existing note data 
const notes = getNotes();
    //push new note 
notes.push(newNote);
    //resave 
    fs.writeFileSync(dbPath, JSON.stringify(notes), 'utf-8');
 return newNote; 
}

function deleteNote(id){
    //get the notes 
const notes = getNotes();
    //filter out the note with given id 
const filter = notes.filter((note) => {
    return note.id !== id;
})
    //resave the notes
    fs.writeFileSync(dbPath, JSON.stringify(filter, 'utf-8'));
}

router.get('/notes', (req, res) => {
const notes = getNotes();
res.json(notes);
});

router.post('/notes', (req, res) => {
    const created = saveNote(req.body.title, req.body.text);
    res.json(created);
})

router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id);
    res.json({
        data: 'ok', 
    })
})
module.exports = router;