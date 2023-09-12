import './Person.css'
const Person = ({ person, deletePerson }) => {
    return (
      <div class="lines">
        {person.name} {person.number}  
        <button onClick={deletePerson}>delete</button>
      </div>
    )
  }
  
  export default Person