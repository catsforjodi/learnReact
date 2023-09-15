// https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-18-2-20
import {useState, useEffect} from 'react'
import axios from 'axios'
const App = () => {
  // STATES
  const [value, setValue] = useState('')
  const [countryNames, setCountryNames] = useState([])
  const [country, setCountry] = useState(null)
  

  // EFFECTS

  // maps ALL countries object into array of names
  useEffect(() => {
    console.log('fetching all data from server...')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const results = Object.entries(response.data).map(country => country[1].name.common)
        console.log('isArray? ', results instanceof Array)
        setCountryNames(results)
      })
  }, [])
  
  useEffect(() => {
    console.log('input value:', value)
    const matchedCountries = countryNames.filter((country) => country.toLowerCase().includes(value.toLowerCase()))
    console.log('matchedCountries', matchedCountries)
  }, [value])

  // useEffect(() => {
  //   console.log('effect run, country is now: ', country)

  //   if (country) {
  //     console.log('fetching country from server...')
  //     axios
  //       .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
  //       .then(response => {
  //         console.log(response)
  //       })
  //   }

  // }, [country])
  
  // HANDLERS
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return(
    <div>
        find countries: 
        <input 
          name="MyInput"
          onChange = {handleChange}
          />
    </div>
  )
}

export default App