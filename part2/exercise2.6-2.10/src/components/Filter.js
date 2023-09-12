const Filter = ({filter, handleFilter }) => {
    return (
      <div>
<form>
        filter shown with <input 
        name='filter'
        value={filter}
        onChange={handleFilter}/>
      </form>
      </div>
    )
  }
  
  export default Filter