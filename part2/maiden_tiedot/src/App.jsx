import { useEffect } from "react"
import { useState } from "react"
import CountryList from "./components/CountryList"
import countriesService from "./services/countries"

function App() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    countriesService.get().then(data => setCountries(data))
  }, [])
  
  let countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <>
      find countries <input type="text" value={searchQuery ?? ''} onChange={(e) => setSearchQuery(e.target.value)} />

      <CountryList countries={countriesToShow} />
      {/* {JSON.stringify(countries)} */}
    </>
  )
}

export default App
