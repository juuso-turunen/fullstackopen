const CountryDetails = ({country}) => {
    if (!country) return

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

export default CountryDetails