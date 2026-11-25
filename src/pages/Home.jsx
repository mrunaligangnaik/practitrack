import { NavLink } from 'react-router-dom'
import Icon from '../components/Icon'

function Home(props) {
  const totalSubjects = props.subjects.length
  const total = props.practicals.length
  const done = props.practicals.filter((p) => p.done).length
  const pending = total - done
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  // last 4 added practicals, newest first
  const recent = props.practicals.slice(-4).reverse()

  // greeting changes with the time of day
  const hour = new Date().getHours()
  let greeting = 'Good Evening'
  if (hour < 12) {
    greeting = 'Good Morning'
  } else if (hour < 17) {
    greeting = 'Good Afternoon'
  }

  return (
    <div className="page">
      {/* ===== HERO ===== */}
      <section className="hero2">
        <div>
          <span className="eyebrow">{greeting}, Mrunali 👋</span>
          <h1>
            Plan your semester.
            <span>Finish every practical.</span>
          </h1>
          <p className="hero-quote">"Write it. Run it. Tick it off."</p>
          <p className="hero-desc">
            Keep every subject and its practical files in one calm place.
            Save your aim, theory, code and output, then watch your semester
            progress grow with each practical you complete.
          </p>
          <div className="hero-actions">
            <NavLink to="/subjects/add" className="btn btn-lg">+ Add Subject</NavLink>
            <NavLink to="/practicals/add" className="btn btn-soft btn-lg">+ Add Practical</NavLink>
          </div>
        </div>

        <div className="window">
          <div className="window-body">
            <div className="win-head">
              <div>
                <p className="win-label">Semester Progress</p>
                <h3>{percent}% Completed</h3>
              </div>
              <b className="win-count">{done}/{total} Done</b>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: percent + '%' }}></div>
            </div>

            <p className="win-label recent-label">Recently added</p>
            {recent.length === 0 && (
              <p className="win-empty">No practicals yet. Add your first one 👆</p>
            )}
            {recent.map((p) => {
              const subject = props.subjects.find((s) => s.id === p.subjectId)
              return (
                <NavLink to={'/practicals/' + p.id} key={p.id} className="win-row">
                  <span className="win-no">P{p.number}</span>
                  <span className="win-title">
                    {p.title}
                    <small>{subject ? subject.code : ''}</small>
                  </span>
                  <span className={p.done ? 'state ok' : 'state wait'}>
                    {p.done ? 'Done' : 'Pending'}
                  </span>
                </NavLink>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== STAT CARDS ===== */}
      <section className="stats stats-4">
        <div className="stat-card c-brown">
          <div className="stat-top">
            <p>Subjects</p>
            <span className="icon-box"><Icon name="book" /></span>
          </div>
          <h2>{totalSubjects}</h2>
        </div>
        <div className="stat-card c-olive">
          <div className="stat-top">
            <p>Practicals</p>
            <span className="icon-box"><Icon name="laptop" /></span>
          </div>
          <h2>{total}</h2>
        </div>
        <div className="stat-card c-green">
          <div className="stat-top">
            <p>Completed</p>
            <span className="icon-box"><Icon name="check" /></span>
          </div>
          <h2>{done}</h2>
        </div>
        <div className="stat-card c-amber">
          <div className="stat-top">
            <p>Pending</p>
            <span className="icon-box"><Icon name="clock" /></span>
          </div>
          <h2>{pending}</h2>
        </div>
      </section>
      {/* ===== GET STARTED (only when there is no data) ===== */}
      {total === 0 && (
        <section>
          <div className="section-head">
            <div>
              <span className="tag-small">GET STARTED</span>
              <h2>Set up your semester in 3 steps</h2>
            </div>
          </div>
          <div className="steps">
            <div className="card step-card">
              <span className="step-no">1</span>
              <h3>Add a subject</h3>
              <p>Create a subject like Web Technology with its code.</p>
            </div>
            <div className="card step-card">
              <span className="step-no">2</span>
              <h3>Add practicals</h3>
              <p>Write the aim, theory, code and output of each practical.</p>
            </div>
            <div className="card step-card">
              <span className="step-no">3</span>
              <h3>Track progress</h3>
              <p>Mark practicals completed and watch your percentage grow.</p>
            </div>
          </div>
        </section>
      )}

      {/* ===== RECENT PRACTICALS ===== */}
      {total > 0 && (
        <section>
          <div className="section-head">
            <div>
              <span className="tag-small">QUICK ACCESS</span>
              <h2>Recent Practicals</h2>
              <p>Jump straight back into what you added last.</p>
            </div>
            <NavLink to="/subjects" className="btn-outline">View all subjects →</NavLink>
          </div>
                  <div className="grid recent-grid">
            {recent.slice(0, 3).map((p) => {
              const subject = props.subjects.find((s) => s.id === p.subjectId)
              return (
<div key={p.id} className={p.done ? 'card recent-card is-done' : 'card recent-card'}>
  <div className="card-top">
    <span className="code-tag">{subject ? subject.name : 'Subject'}</span>
    <span className={p.done ? 'status ok' : 'status wait'}>
      {p.done ? 'Completed' : 'Pending'}
    </span>
  </div>
  <h3>Practical {p.number}: {p.title}</h3>
  <p>{p.description || 'No description added.'}</p>
  <NavLink to={'/practicals/' + p.id} className="btn-outline">View Details →</NavLink>
</div>
              )
            })}
          </div>
        </section>
      )}

      {/* ===== SUBJECT-WISE PROGRESS ===== */}
      <div className="card">
      <h3 className="section-title">Subject-wise Progress</h3>
        {props.subjects.length === 0 && (
          <p className="empty">No subjects yet. Click "+ Add Subject" to start your semester.</p>
        )}
        {props.subjects.map((s) => {
          const list = props.practicals.filter((p) => p.subjectId === s.id)
          const d = list.filter((p) => p.done).length
          const pc = list.length === 0 ? 0 : Math.round((d / list.length) * 100)
          return (
            <div key={s.id} className="subject-row">
              <div className="row-top">
                <NavLink to={'/subjects/' + s.id}><b>{s.name}</b></NavLink>
                <span className="pill">{d}/{list.length} • {pc}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: pc + '%' }}></div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ===== BANNER ===== */}
      <section className="banner">
        <h2>Ready for your React viva?</h2>
        <p>
          This project uses React Router, props and state, useState, useEffect,
          useRef, useParams, useNavigate and form validation.
        </p>
        <div className="hero-actions">
          <NavLink to="/about" className="btn btn-light">About this project</NavLink>
          <NavLink to="/progress" className="btn-outline btn-ghost">Open progress report</NavLink>
        </div>
      </section>
    </div>
  )
}

export default Home