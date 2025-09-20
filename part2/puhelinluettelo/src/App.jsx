import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
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
        {persons.map((person) =>
          <li key={person.name}>{person.name}: {person.number}</li>
        )}
      </ul>
    </div>
  )

}

export default App