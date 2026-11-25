import { useState, useRef, useEffect } from 'react'
import PracticalLifecycle from '../components/PracticalLifecycle'

function About() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const nameBox = useRef(null)

  // focus the name field when the page opens
  useEffect(() => {
    nameBox.current.focus()
  }, [])

  // update one field while typing
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}

    if (form.name.trim() === '') {
      newErrors.name = 'Name is required'
    }
    if (form.email.trim() === '') {
      newErrors.email = 'Email is required'
    } else if (!form.email.includes('@') || !form.email.includes('.')) {
      newErrors.email = 'Enter a valid email'
    }
    if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
    } else {
      setSuccess(false)
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">About PractiTrack</h1>

      <div className="card">
        <h3>💻 What is this?</h3>
        <p>PractiTrack is my practical journal. I made it to view my practicals, mark them as completed and see my progress. It is built with ReactJS and React Router, and saves data in LocalStorage.</p>
        <p><b>Student:</b> Mrunali | MCA | Roll No: 32 | Division: A</p>
      </div>

      <div className="card">
        <h3>✉ Contact Form</h3>
        <form onSubmit={handleSubmit}>
          <input ref={nameBox} name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}

          <input name="email" placeholder="Your email" value={form.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <textarea name="message" rows="4" placeholder="Your message" value={form.message} onChange={handleChange}></textarea>
          {errors.message && <p className="error">{errors.message}</p>}

          <button className="btn" type="submit">Send Message</button>
        </form>
        {success && <p className="success">✅ Message sent successfully!</p>}
      </div>

      <button className="btn-outline" onClick={() => setShowDemo(!showDemo)}>
        {showDemo ? 'Hide' : 'Show'} Lifecycle Demo
      </button>
      {showDemo && <PracticalLifecycle />}
    </div>
  )
}

export default About