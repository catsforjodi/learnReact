// https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-18-2-20
import {useState, useEffect} from 'react'
import axios from 'axios'
import Prompt from './components/Prompt'
import CountriesList from './components/CountriesList'
const App = () => {
  // STATES
  const [allCountries, setAllCountries] = useState([])  
  const [value, setValue] = useState('')
  const [countryNames, setCountryNames] = useState([])
  const [countries, setCountries] = useState([])  
  const [countriesData, setCountriesData] = useState([])  
  const [matchedCountries, setMatchedCountries] = useState([])
  const [tempMatchedCountries, setTempMatchedCountries] = useState([])

  const [tooManyMatches, isTooManyMatches] = useState(false)
  const [valueEmpty, isValueEmpty] = useState(false)
  // EFFECTS

  // maps ALL countries object into array of names
  useEffect(() => {
    console.log('fetching all data from server...')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const allCountries = Object.entries(response.data).map(country => country[1])
        setAllCountries(allCountries)
        const allCountriesNames = allCountries.map(country => country.name.common)
        setCountryNames(allCountriesNames)
      })
  }, [])
  
  useEffect(() => {
    const tempMatchedCountries = countryNames.filter((country) => country.toLowerCase().includes(value.toLowerCase()))
    setMatchedCountries(tempMatchedCountries)

    if (!value) {
      isTooManyMatches(false)
      isValueEmpty(true)

    } else if (matchedCountries.length > 10) {
      isTooManyMatches(true)
      isValueEmpty(false)

    } else if (matchedCountries.length >= 1 && matchedCountries.length <= 10) {
      isTooManyMatches(false)
      isValueEmpty(false)

      setCountries(matchedCountries)
      getCountriesData(matchedCountries)
      
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  // FUNCTIONS
  const getCountriesData = (matchedCountries) => {
    let data = []
    for (let i = 0; i < matchedCountries.length; i++) {
      const element = matchedCountries[i];
      const entry = allCountries.filter((country) => country.name.common ===element)[0]
      data.push(entry)      
    }
    setCountriesData(data)
  }

  return(
    <div>
        find countries: 
        <input 
          name="MyInput"
          value={value}
          onChange = {handleChange}
          />
        <Prompt tooManyMatches={tooManyMatches}/>
        <CountriesList show={valueEmpty} countries={countries} countriesData={countriesData}/>
        
    </div>

  )
}

export default App