import { NavLink } from 'react-router-dom'
import SubjectCard from '../components/SubjectCard'

function Subjects(props) {
  return (
    <div className="page">
      <div className="page-head">
        <h1 className="page-title">📚 My Subjects</h1>
        <NavLink to="/subjects/add" className="btn">+ Add Subject</NavLink>
      </div>

      {props.subjects.length === 0 && (
        <p className="empty">No subjects added yet. Click "+ Add Subject".</p>
      )}

      <div className="grid">
        {props.subjects.map((s) => (
          <SubjectCard
            key={s.id}
            subject={s}
            practicals={props.practicals.filter((p) => p.subjectId === s.id)}
            deleteSubject={props.deleteSubject}
          />
        ))}
      </div>
    </div>
  )
}

export default Subjects