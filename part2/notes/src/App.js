import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    ''
  )
  const [showAll, setShowAll] = useState(true)

  const toggleImportanceOf = id => 
  {    
    const url = `http://localhost:3002/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    })
  }
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3002/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  console.log('render,', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject ={
      content: newNote,
      important: Math.random < 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })    
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll? 'important' : ''}
        </button>
      </div>
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note}            toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
        </ul>

        <form onSubmit={addNote}>
          <input 
            value ={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">save</button>
        </form>
    </div>
  )
}

export default App
