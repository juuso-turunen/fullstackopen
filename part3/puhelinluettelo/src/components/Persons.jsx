const Persons = ({persons, deleteFunction}) => {
    return (
      <ul>
        {persons.map((person) =>
          <li key={person.name}>{person.name}: {person.number} <button onClick={() => deleteFunction(person.id)}>delete</button></li>
        )}
      </ul>
    )
}

export default Persons