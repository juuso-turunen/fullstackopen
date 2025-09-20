import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personService from './services/persons'

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
    
    const existingPerson = persons.find((person) => person.name === newName)
    
    if (!existingPerson) {
      const newPerson = {name: newName, number: newNumber}

      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })

      setNewName('')
      setNewNumber('')
    } else {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (confirmUpdate) {
        const updatedPerson = {...existingPerson, number: newNumber}

        personService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          
          setNewName('')
          setNewNumber('')
        })
      }
    }
  }

  const deletePerson = (id) => {
    const confirmDelete = window.confirm(`Delete ${persons.find(person => person.id === id).name}`)
    if (! confirmDelete) return;

    personService.remove(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
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
      <Persons persons={filteredPersons} deleteFunction={deletePerson}/>
    </div>
  )

}

export default App