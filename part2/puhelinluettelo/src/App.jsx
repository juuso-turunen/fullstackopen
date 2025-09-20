import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setFilteredPersons(response.data)
        setPersons(response.data)
      }
    )
  }, [])

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
      <Persons persons={filteredPersons}/>
    </div>
  )

}

export default App