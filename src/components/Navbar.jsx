import { NavLink } from 'react-router-dom'

function Navbar(props) {
  const total = props.practicals.length
  const done = props.practicals.filter((p) => p.done).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        <span className="logo-box">💻</span>
        <span className="logo-text">
          PractiTrack
          <small>MY SEMESTER JOURNAL</small>
        </span>
      </NavLink>

      <nav className="menu">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/subjects">Subjects</NavLink>
        <NavLink to="/progress">My Progress</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      {/* small progress pill, visible on every page */}
      <div className="nav-progress">
        <div className="mini-bar">
          <div className="mini-fill" style={{ width: percent + '%' }}></div>
        </div>
        <span>{done}/{total} Done</span>
      </div>
    </header>
  )
}

export default Navbar