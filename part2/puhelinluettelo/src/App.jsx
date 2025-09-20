import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      }
    )
  }, [])
  
  const addNewPerson = (e) => {
    e.preventDefault()
    
    const isNewPerson = !persons.some((person) => person.name === newName)
    
    if (isNewPerson) {
      const newPerson = {name: newName, number: newNumber}
      axios.post('http://localhost:3001/persons', newPerson).then(response => {
        setPersons(persons.concat(response.data))
      })
      // const newPersons = [...persons, newPerson]
      // setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} filterFunction={(e) => setSearchQuery(e.target.value)} />

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