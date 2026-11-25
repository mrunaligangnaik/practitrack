import { NavLink } from 'react-router-dom'

function NotFound() {
  return (
    <div className="page not-found">
      <h1>😕 404</h1>
      <p>Page not found.</p>
      <NavLink to="/" className="btn">Back to Home</NavLink>
    </div>
  )
}

export default NotFound