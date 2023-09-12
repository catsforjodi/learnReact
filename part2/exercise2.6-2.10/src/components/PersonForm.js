const PersonForm = ({ addPerson, newName, handleChangeName, newPhoneNumber, handleChangeNumber }) => {
    return (
      <div>
        <form onSubmit={addPerson}>
        <div>
            name: <input 
          name='name'
          value={newName}
          onChange={handleChangeName}/>
        </div>
        <div>
          number: <input
          name='number'
          value={newPhoneNumber}
          onChange={handleChangeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
    )
  }
  
  export default PersonForm