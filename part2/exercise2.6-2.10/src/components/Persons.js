import Person from './Person'
import personService from '../services/persons'

const Persons = ({ personsToShow, persons, setPersons }) => {

  const deletePersonOf = id => {
    const person = persons.find(p => p.id === id)
    console.log('trying to delete person:', person)

    window.confirm(`Delete ${person.name}?`)

    personService
      .deleteId(id)
      .then(returned => {
        console.log('returned', returned)
      setPersons(persons.filter(p => p.id !== id))
    })
  }
    return (
      <div>
{personsToShow.map(person=>
    <Person person={person} key={person.name} deletePerson={() => deletePersonOf(person.id)}/>
    )}
      </div>
    )
  }
  
  export default Persons


