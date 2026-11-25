import { useState, useRef, useEffect } from 'react'
import PracticalCard from '../components/PracticalCard'

function Practicals(props) {
  const [searchText, setSearchText] = useState('')
  const [filter, setFilter] = useState('all')
  const searchBox = useRef(null)

  // focus the search box when the page opens
  useEffect(() => {
    searchBox.current.focus()
  }, [])

  // step 1: search by title or number
  let list = props.practicals.filter((p) => {
    const text = searchText.toLowerCase()
    return p.title.toLowerCase().includes(text) || String(p.id).includes(text)
  })

  // step 2: filter by status
  if (filter === 'completed') {
    list = list.filter((p) => props.completedIds.includes(p.id))
  } else if (filter === 'pending') {
    list = list.filter((p) => !props.completedIds.includes(p.id))
  }

  return (
    <div className="page">
      <h1 className="page-title">💻 My Practicals</h1>

      <div className="toolbar">
        <input
          ref={searchBox}
          className="search-input"
          type="text"
          placeholder="Search by name or number..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="filters">
          <button className={filter === 'all' ? 'filter-btn selected' : 'filter-btn'} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'completed' ? 'filter-btn selected' : 'filter-btn'} onClick={() => setFilter('completed')}>Completed</button>
          <button className={filter === 'pending' ? 'filter-btn selected' : 'filter-btn'} onClick={() => setFilter('pending')}>Pending</button>
        </div>
      </div>

      <div className="grid">
        {list.map((p) => (
          <PracticalCard
            key={p.id}
            practical={p}
            isDone={props.completedIds.includes(p.id)}
            toggleComplete={props.toggleComplete}
          />
        ))}
      </div>

      {list.length === 0 && <p className="empty">No practicals found.</p>}
    </div>
  )
}

export default Practicals