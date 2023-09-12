import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import personService from './services/persons'

const Footer = () => {  const footerStyle = {    color: 'green',    fontStyle: 'italic',    fontSize: 16  }  
return (    <div style={footerStyle}>      <br />      <em>Phonebook app, Jodi's House, 1231</em>    </div>  )}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [addedAlert, setAddedAlert] = useState('')
  const [deleteAlert, setDeleteAlert] = useState('')


  const hook = () => {
    console.log('effect')
    const promise = axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log('response', response)
      })
    console.log(promise)
  }
  
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons=> {
      setPersons(initialPersons)
    })
  
  }, [])

  const addPerson = (event) => {
    if (includesPerson) {
      confirm(event)
    } else {
      event.preventDefault()
      const newObject = {
        name: newName,
        number: newPhoneNumber
      }
      personService
        .create(newObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhoneNumber('')

          setAddedAlert(
            `Added ${returnedPerson.name}`
          )
          setTimeout(()=> {
            setAddedAlert(null)
          }, 5000)
        })
    }
  }

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }  
  
  const handleChangeNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const includesPerson = persons.find(person => person.name === newName)
  const confirm = (event) => {
    if(window.confirm(`${newName} is already added to phonebook, add a new one?`)) {
      event.preventDefault()
      const newObject = {
        ...includesPerson,
        number: newPhoneNumber
      }
      personService
        .update(includesPerson.id, newObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== includesPerson.id? p : returnedPerson))
          setNewName('')
          setNewPhoneNumber('')

          setAddedAlert(
            `Added ${includesPerson.name}`
          )
          setTimeout(()=> {
            setAddedAlert(null)
          }, 5000)
        })
    
        .catch(error => {
          setPersons(persons.filter(p => p.id !== includesPerson.id))
          setDeleteAlert(
            `Information of ${includesPerson.name} has already been removed from server`
          )
          setTimeout(()=> {
            setDeleteAlert(null)
          }, 5000)
        })
      
    }
  }

  const Notification = ({ message }) => {
    if (!message) {
      return null
    }
  
    return (
      <div className='addedNoti'>
        {message}
      </div>
    )
  }

  const Error = ({ message }) => {
    if (!message) {
      return null
    }
  
    return (
      <div className='deleteError'>
        {message}
      </div>
    )
  }

  const personsToShow = !filter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedAlert} />
      <Error message={deleteAlert} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      
      <PersonForm addPerson={addPerson} newName={newName} handleChangeName={handleChangeName} newPhoneNumber={newPhoneNumber} handleChangeNumber={handleChangeNumber}/>

      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow} persons={persons} setPersons={setPersons}/>
      
      <Footer />
    </div>
  )
}

export default App