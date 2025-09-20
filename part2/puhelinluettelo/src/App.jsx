import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

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
      setFilteredPersons(newPersons)
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
      <Filter searchQuery={searchQuery} filterFunction={filterPersons} />

      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        submitFunction={addNewPerson}
      />

      <h3>Numbers</h3>
      {console.log(filteredPersons)}
      <Persons persons={filteredPersons}/>
    </div>
  )

}

export default App