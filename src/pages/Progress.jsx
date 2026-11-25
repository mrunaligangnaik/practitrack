import { NavLink } from 'react-router-dom'

function Progress(props) {
  const total = props.practicals.length
  const done = props.practicals.filter((p) => p.done).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  // message changes with percentage
  let message = 'Add practicals and start your journey 🚀'
  if (total > 0 && percent === 0) {
    message = 'Time to complete your first practical 💡'
  } else if (percent === 100) {
    message = 'All done! Well done 🎉'
  } else if (percent >= 50) {
    message = 'More than halfway there 🔥'
  } else if (percent > 0) {
    message = 'Great start! Keep going 💪'
  }

  return (
    <div className="page">
      <h1 className="page-title">📊 My Semester Progress</h1>

      <div className="card progress-card">
        <h2>{percent}% Completed</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: percent + '%' }}></div>
        </div>
        <p>{message}</p>
        <p>{done} of {total} practicals completed ({total - done} pending)</p>
      </div>

      <h2 className="page-title">Subject-wise</h2>
      {props.subjects.length === 0 && <p className="empty">No subjects added yet.</p>}

      {props.subjects.map((s) => {
        const list = props.practicals.filter((p) => p.subjectId === s.id)
        const d = list.filter((p) => p.done).length
        const pc = list.length === 0 ? 0 : Math.round((d / list.length) * 100)
        return (
          <div key={s.id} className="card">
            <div className="row-top">
              <NavLink to={'/subjects/' + s.id}><h3>📚 {s.name} ({s.code})</h3></NavLink>
              <b>{pc}%</b>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: pc + '%' }}></div>
            </div>
            <p className="small">{d} completed, {list.length - d} pending, {list.length} total</p>
          </div>
        )
      })}
    </div>
  )
}

export default Progress