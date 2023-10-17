import {useState, useEffect} from 'react'
const CountriesList = ({valueEmpty, countries, countriesData}) => {
    const [countriesDataWithShowField, setcountriesDataWithShowField] = useState([])
    
    //should run once on initial
    useEffect(() =>{
        if(countriesData.length > 1) {
            const temp = countriesData.map(item => ({...item, show:false}))
            setcountriesDataWithShowField(temp)
        }
    },[countriesData])
    
    const handleShowButtonClick = (index) => {
        const temp = countriesDataWithShowField.map((country, i) => {
            if (i === index) {
                return {...country, show: !country.show}
            }
            return country
        })
        setcountriesDataWithShowField(temp)
    }

    if (valueEmpty) {
        return null
    } else if (countriesData.length > 1) {
        return (countriesDataWithShowField.map((country, index) => {
                return(
                <div key={index}>
                    <div>{country.name.common} <button onClick=
                        {() => handleShowButtonClick(index)}>{country.show? 'hide' : 'show'}</button></div>
                    {
                        country.show && <div>
                        <h1>{country.name.common}</h1>
                        <div>capital {country.capital}</div> 
                        <div>area {country.area}</div> 
                        <br></br>
                        <strong>Languages:</strong>
                        <ul>
                            {Object.entries(country.languages).map(([key, value], index) => (
                            <li key={index}>{value}</li>
                            ))}
                        </ul>
                        <img src={country.flags.png} alt={country.flags.alt}/>
                        </div>}
                </div>
                )
        })
        )

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
