import { useNavigate } from 'react-router-dom'

function SubjectCard(props) {
  const navigate = useNavigate()
  const s = props.subject

  const total = props.practicals.length
  const done = props.practicals.filter((p) => p.done).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  function handleDelete() {
    if (window.confirm('Delete this subject and all its practicals?')) {
      props.deleteSubject(s.id)
    }
  }

  return (
    <div className="card subject-card">
      <span className="code-tag">{s.code}</span>
      <h3>📚 {s.name}</h3>
      <p className="desc">{s.description || 'No description added.'}</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: percent + '%' }}></div>
      </div>
      <p className="small">{done} of {total} practicals done ({percent}%)</p>

      <div className="card-buttons">
        <button className="btn" onClick={() => navigate('/subjects/' + s.id)}>Open</button>
        <button className="btn-outline" onClick={() => navigate('/subjects/' + s.id + '/edit')}>Edit</button>
        <button className="btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default SubjectCard