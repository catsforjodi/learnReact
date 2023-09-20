const CountriesList = ({countries, countriesData}) => {
    console.log('in CountriesList component, countriesData:', countriesData)
    if (countriesData.length > 1) {
        return (countriesData.map(country => <div>{country.name.common}</div>))
    } else if (countriesData.length === 1) {
        return (<div>
        <h1>{countriesData[0].name.common}</h1>
        <div>capital {countriesData[0].capital}</div> 
        <div>area {countriesData[0].area}</div> 
        <br></br>
        <strong>Languages:</strong>
        <ul>
            {Object.entries(countriesData[0].languages).map(([key, value], index) => (
            <li key={index}>{value}</li>
            ))}
        </ul>
        <img src={countriesData[0].flags.png} alt={countriesData[0].flags.alt}/>
        </div>
        )
    }
}

export default CountriesList
