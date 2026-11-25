import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// one form used for both Add and Edit
function SubjectForm(props) {
  const { id } = useParams()           // exists only on the edit route
  const navigate = useNavigate()

  // when editing, find the old subject; when adding, this is undefined
  const old = id ? props.subjects.find((s) => s.id === Number(id)) : null

  const [form, setForm] = useState({
    name: old ? old.name : '',
    code: old ? old.code : '',
    description: old ? old.description : ''
  })
  const [error, setError] = useState('')

  if (id && !old) {
    return <div className="page"><h1 className="page-title">Subject not found</h1></div>
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.name.trim() === '' || form.code.trim() === '') {
      setError('Subject name and subject code are required')
      return
    }
    if (old) {
      props.updateSubject(old.id, form)
      navigate('/subjects/' + old.id)
    } else {
      props.addSubject(form)
      navigate('/subjects')
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">{old ? 'Edit Subject' : 'Add Subject'}</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Subject Name</label>
          <input name="name" placeholder="Web Technology" value={form.name} onChange={handleChange} />

          <label>Subject Code</label>
          <input name="code" placeholder="MCA-201" value={form.code} onChange={handleChange} />

          <label>Description</label>
          <textarea name="description" rows="3" placeholder="Short description" value={form.description} onChange={handleChange}></textarea>

          {error && <p className="error">{error}</p>}

          <div className="card-buttons">
            <button className="btn" type="submit">{old ? 'Save Changes' : 'Add Subject'}</button>
            <button className="btn-outline" type="button" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubjectForm