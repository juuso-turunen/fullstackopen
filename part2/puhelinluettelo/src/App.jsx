import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filterPersons = (e) => {
    const newSearchQuery = e.target.value
    setSearchQuery(newSearchQuery)
    setFilteredPersons(persons.filter((person) => person.name.toLocaleLowerCase().includes(newSearchQuery.toLocaleLowerCase())))
  }
  
  const addNewPerson = (e) => {
    e.preventDefault()
    
    const isNewPerson = !persons.some((person) => person.name === newName)

    if (isNewPerson) {
      const newPersons = [...persons, {name: newName, number: newNumber}]
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchQuery} onChange={filterPersons} />
      </div>

      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          number: <input type="tel" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button onClick={addNewPerson} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) =>
          <li key={person.name}>{person.name}: {person.number}</li>
        )}
      </ul>
    </div>
  )

}

export default App