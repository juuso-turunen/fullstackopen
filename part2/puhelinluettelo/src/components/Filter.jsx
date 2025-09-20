const Filter = ({searchQuery, filterFunction}) => {
    return (
      <div>
        filter shown with <input value={searchQuery} onChange={filterFunction} />
      </div>
    )
}

export default Filter