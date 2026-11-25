import { useParams, useNavigate, NavLink } from 'react-router-dom'
import { useState } from 'react'

function PracticalDetails(props) {
  const { id } = useParams()
  const navigate = useNavigate()

  const p = props.practicals.find((item) => item.id === Number(id))
    const [bigImage, setBigImage] = useState(null)

  if (!p) {
    return (
      <div className="page">
        <h1 className="page-title">Practical not found</h1>
        <NavLink to="/subjects" className="btn">← Back to Subjects</NavLink>
      </div>
    )
  }

  const subject = props.subjects.find((s) => s.id === p.subjectId)

  function handleDelete() {
    if (window.confirm('Delete this practical?')) {
      props.deletePractical(p.id)
      navigate('/subjects/' + p.subjectId)
    }
  }

  return (
    <div className="page details">
      <button className="btn-outline" onClick={() => navigate('/subjects/' + p.subjectId)}>
        ← Back to {subject ? subject.name : 'Subject'}
      </button>

      <h1 className="page-title">💻 Practical {p.number}: {p.title}</h1>
      <p>
        {subject && <span className="code-tag">{subject.code}</span>}{' '}
        {p.done ? (
          <span className="badge done-badge">✅ Completed</span>
        ) : (
          <span className="badge pending-badge">⏳ Pending</span>
        )}
      </p>

      <div className="card"><h3>Description</h3><p>{p.description || '-'}</p></div>
      <div className="card"><h3>Aim</h3><p>{p.aim || '-'}</p></div>
      <div className="card"><h3>Theory</h3><p>{p.theory || '-'}</p></div>
      <div className="card"><h3>Procedure</h3><p>{p.procedure || '-'}</p></div>
      <div className="card"><h3>Source Code</h3><pre className="code-box">{p.code || '-'}</pre></div>
            <div className="card">
        <h3>Output</h3>
        <pre className="code-box">{p.output || '-'}</pre>

        {p.images && p.images.length > 0 && (
          <div className="shot-grid">
            {p.images.map((src, index) => (
              <div className="shot" key={index}>
                <img src={src} alt={'Output screenshot ' + (index + 1)} />
                <div className="shot-buttons">
                  <button type="button" className="view-btn" onClick={() => setBigImage(src)}>View</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card"><h3>Conclusion</h3><p>{p.conclusion || '-'}</p></div>

      <div className="card-buttons">
        <button className="btn" onClick={() => props.toggleComplete(p.id)}>
          {p.done ? '✅ Completed (click to undo)' : 'Mark as Completed'}
        </button>
        <button className="btn-outline" onClick={() => navigate('/practicals/' + p.id + '/edit')}>Edit</button>
        <button className="btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default PracticalDetails