import { useNavigate } from 'react-router-dom'

// data comes from the parent through props
function PracticalCard(props) {
  const navigate = useNavigate()
  const p = props.practical

  function handleDelete() {
    if (window.confirm('Delete this practical?')) {
      props.deletePractical(p.id)
    }
  }

  return (
  <div className={p.done ? 'card practical-card is-done' : 'card practical-card'}>
      <div className="card-top">
        <span className="number">💻 Practical {p.number}</span>
        {p.done ? (
          <span className="badge done-badge">✅ Completed</span>
        ) : (
          <span className="badge pending-badge">⏳ Pending</span>
        )}
      </div>

      <h3>{p.title}</h3>
      <p>{p.description || 'No description.'}</p>

      <div className="card-buttons">
        <button className="btn-outline" onClick={() => navigate('/practicals/' + p.id)}>View</button>
        <button className="btn" onClick={() => props.toggleComplete(p.id)}>
          {p.done ? 'Undo' : 'Mark Completed'}
        </button>
        <button className="btn-outline" onClick={() => navigate('/practicals/' + p.id + '/edit')}>Edit</button>
        <button className="btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default PracticalCard