const CountryList = ({countries}) => {
    if (countries.length > 10) return (
        <p>Too many mathces, specify another filter</p>
    )

    if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <h2>{country.name.common}</h2>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>

                <h3>Languages</h3>
                <ul>
                  {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                  )}
                </ul>
                <img width={200} src={country.flags.svg} alt="" />
            </div>
        )
    }

    return (
    <ul>
      {countries.map(country => 
        <li key={country.name.official}>{country.name.common}</li>
      )}
    </ul>
    )
}

export default CountryList