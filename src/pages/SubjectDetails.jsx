import { useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import PracticalCard from '../components/PracticalCard'

function SubjectDetails(props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [filter, setFilter] = useState('all')

  const subject = props.subjects.find((s) => s.id === Number(id))

  if (!subject) {
    return (
      <div className="page">
        <h1 className="page-title">Subject not found</h1>
        <NavLink to="/subjects" className="btn">← Back to Subjects</NavLink>
      </div>
    )
  }

  // only the practicals of this subject
  const all = props.practicals.filter((p) => p.subjectId === subject.id)
  const done = all.filter((p) => p.done).length

  // search by title or number, then filter by status
  let list = all.filter((p) => {
    const text = searchText.toLowerCase()
    return p.title.toLowerCase().includes(text) || String(p.number).includes(text)
  })
  if (filter === 'completed') {
    list = list.filter((p) => p.done)
  } else if (filter === 'pending') {
    list = list.filter((p) => !p.done)
  }

  function handleDelete() {
    if (window.confirm('Delete this subject and all its practicals?')) {
      props.deleteSubject(subject.id)
      navigate('/subjects')
    }
  }

  return (
    <div className="page">
      <NavLink to="/subjects" className="btn-outline">← All Subjects</NavLink>

      <div className="card subject-info">
        <span className="code-tag">{subject.code}</span>
        <h1>📚 {subject.name}</h1>
        <p>{subject.description || 'No description added.'}</p>
        <div className="card-buttons">
          <NavLink to={'/subjects/' + subject.id + '/practicals/add'} className="btn">+ Add Practical</NavLink>
          <NavLink to={'/subjects/' + subject.id + '/edit'} className="btn-outline">Edit Subject</NavLink>
          <button className="btn-danger" onClick={handleDelete}>Delete Subject</button>
        </div>
      </div>

      <section className="stats">
        <div className="stat-card"><h2>{all.length}</h2><p>💻 Total</p></div>
        <div className="stat-card"><h2 className="green">{done}</h2><p>✅ Completed</p></div>
        <div className="stat-card"><h2 className="orange">{all.length - done}</h2><p>⏳ Pending</p></div>
      </section>

      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title or number..."
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
            toggleComplete={props.toggleComplete}
            deletePractical={props.deletePractical}
          />
        ))}
      </div>

      {list.length === 0 && <p className="empty">No practicals found. Click "+ Add Practical".</p>}
    </div>
  )
}

export default SubjectDetails