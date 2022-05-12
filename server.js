const fs = require('fs')
const path = require('path')
const express = require('express')

const notes = require('./data/db.json')
console.log(notes)
const { sendFile } = require('express/lib/response')

const PORT = process.env.PORT || 3002
const app = express()

// MIDDLEWARE
// Parse incoming string or array data
app.use(express.urlencoded({ extended: true}))
// Parse incoming JSON data
app.use(express.json())
// Connect assets to files
app.use(express.static('public'))

function createNewNote(body, notesArray) {
    const note = body
    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, './data/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    )
    return note
}

// ROUTING BEGIN
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    // read the the db.json file and return all saved notes as JSON
    res.json(notes)
})
app.post('/api/notes', (req, res) => {
    // receive the new note 
    const note = createNewNote(req.body, notes)
    res.json(note)

    // add the note to the db.json file
    // return the new note to the client
    // give each note a unique id
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
app.listen(PORT, () => {
    console.log(`API server now live on ${PORT}!`)
})