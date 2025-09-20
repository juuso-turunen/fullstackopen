const PersonForm = ({newName, setNewName, newNumber, setNewNumber, submitFunction}) => {
    return (
      <form>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          number: <input type="tel" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button onClick={submitFunction} type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm