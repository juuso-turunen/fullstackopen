import { useState } from "react"
import CountryDetails from "./CountryDetails"

const CountryList = ({countries}) => {
    const [countryToShow, setCountryToShow] = useState(null)

    if (countries.length > 10) return (
        <p>Too many mathces, specify another filter</p>
    )

    if (countries.length === 1) {
        const country = countries[0]
        return (
            <CountryDetails country={country} />
        )
    }
    
    return (
        <div>
            <ul>
            {countries.map(country => 
                <li key={country.name.official}>
                    {country.name.common}
                    <button onClick={() => setCountryToShow(country)}>Show</button>
                </li>
            )}
            </ul>
            <CountryDetails country={countryToShow} />
        </div>
    )
}

export default CountryList