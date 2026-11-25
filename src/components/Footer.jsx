import { NavLink } from 'react-router-dom'

function Footer(props) {
  const total = props.practicals.length
  const done = props.practicals.filter((p) => p.done).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <p className="footer-brand">💻 PractiTrack</p>
            <p className="footer-quote">"Track. Practice. Complete."</p>
            <p>A Single Page Application to manage semester subjects, practical documentation and progress.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/subjects">My Subjects</NavLink>
            <NavLink to="/progress">My Progress</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>

          <div>
            <h4>Student Details</h4>
            <p><b>Name:</b> Mrunali</p>
            <p><b>Course:</b> MCA</p>
            <p><b>Roll No:</b> 32 | <b>Div:</b> A</p>
            <p><b>Practical:</b> 14 (SPA using React Router)</p>
          </div>

          <div>
            <h4>Journal Status</h4>
            <div className="footer-status">
              <p>Completed: <b>{done} of {total}</b></p>
              <p>Progress: <b>{percent}%</b></p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: percent + '%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 PractiTrack. Built for the college React practical.</span>
          <span>React Router • Hooks • LocalStorage</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer