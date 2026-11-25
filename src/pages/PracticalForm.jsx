import { useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'

// one form used for Add Practical and Edit Practical
function PracticalForm(props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = props.mode === 'edit'

    // which screenshot is open in the big view (null = none)
  const [bigImage, setBigImage] = useState(null)

  // edit route: id is the practical id.  add route: id (if present) is the subject id
  const old = isEdit ? props.practicals.find((p) => p.id === Number(id)) : null

  let startSubjectId = 0
  if (isEdit && old) {
    startSubjectId = old.subjectId
  } else if (!isEdit && id) {
    startSubjectId = Number(id)
  } else if (props.subjects.length > 0) {
    startSubjectId = props.subjects[0].id
  }

  // suggest the next practical number for that subject
  const nextNumber = props.practicals.filter((p) => p.subjectId === startSubjectId).length + 1

  const [subjectId, setSubjectId] = useState(startSubjectId)
  const [form, setForm] = useState(
    old
      ? { ...old }
      : {
          number: String(nextNumber),
          title: '',
          description: '',
          aim: '',
          theory: '',
          procedure: '',
          code: '',
          output: '',
          conclusion: ''
        }
  )
  const [error, setError] = useState('')
    // output screenshots, saved as small image text (base64)
  const [images, setImages] = useState(old && old.images ? old.images : [])
  if (props.subjects.length === 0) {
    return (
      <div className="page">
        <h1 className="page-title">Add a subject first</h1>
        <NavLink to="/subjects/add" className="btn">+ Add Subject</NavLink>
      </div>
    )
  }

  if (isEdit && !old) {
    return <div className="page"><h1 className="page-title">Practical not found</h1></div>
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

    // runs when the student picks screenshot files
    // shrink one image file and add it to the list
  function addImageFile(file) {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        // make the picture smaller so LocalStorage does not get full
        const scale = Math.min(1, 900 / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        const small = canvas.toDataURL('image/jpeg', 0.7)
        setImages((old) => [...old, small])
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  // picking files with the button (many allowed)
  function handleImages(e) {
    Array.from(e.target.files).forEach(addImageFile)
    e.target.value = ''
  }

  // pasting with Ctrl + V
  function handlePaste(e) {
    const items = Array.from(e.clipboardData.items)
    items.forEach((item) => {
      if (item.type.startsWith('image/')) {
        e.preventDefault()               // do not paste text
        addImageFile(item.getAsFile())
      }
    })
  }
  function removeImage(index) {
    setImages(images.filter((item, i) => i !== index))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (String(form.number).trim() === '' || form.title.trim() === '') {
      setError('Practical number and title are required')
      return
    }
  
    const data = { ...form, images: images, subjectId: Number(subjectId) }

    if (isEdit) {
      props.updatePractical(old.id, data)
      navigate('/practicals/' + old.id)
    } else {
      props.addPractical(data)
      navigate('/subjects/' + subjectId)
    }
  }

  // big text boxes: [field name, label]
  const textFields = [
    ['aim', 'Aim'],
    ['theory', 'Theory'],
    ['procedure', 'Procedure'],
    ['code', 'Source Code'],
    ['output', 'Output'],
    ['conclusion', 'Conclusion']
  ]

  return (
    <div className="page">
      <h1 className="page-title">{isEdit ? 'Edit Practical' : 'Add Practical'}</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Subject</label>
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
            {props.subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
            ))}
          </select>

          <label>Practical Number</label>
          <input name="number" value={form.number} onChange={handleChange} />

          <label>Title</label>
          <input name="title" placeholder="e.g. Node.js Modules" value={form.title} onChange={handleChange} />

          <label>Short Description</label>
          <input name="description" placeholder="One line about this practical" value={form.description} onChange={handleChange} />

          {textFields.map((f) => (
            <div key={f[0]} className="field">
              <label>{f[1]}</label>
              <textarea
                name={f[0]}
                rows={f[0] === 'code' ? 8 : 3}
                className={f[0] === 'code' ? 'code-input' : ''}
                value={form[f[0]]}
                onChange={handleChange}
                onPaste={f[0] === 'output' ? handlePaste : undefined}
                placeholder={f[0] === 'output' ? 'Type output here, or press Ctrl + V to paste a screenshot' : ''}
              ></textarea>

              {/* screenshot upload, only under Output */}
                            {/* pasted screenshots, only under Output */}
              {f[0] === 'output' && images.length > 0 && (
                <div className="shot-grid">
                  {images.map((src, index) => (
                    <div className="shot" key={index}>
                      <img src={src} alt={'Output screenshot ' + (index + 1)} />
                      <div className="shot-buttons">
                        <button type="button" className="view-btn" onClick={() => setBigImage(src)}>View</button>
                        <button type="button" onClick={() => removeImage(index)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          ))}

          {error && <p className="error">{error}</p>}

          <div className="card-buttons">
            <button className="btn" type="submit">{isEdit ? 'Save Changes' : 'Add Practical'}</button>
            <button className="btn-outline" type="button" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>

            {bigImage && (
        <div className="lightbox" onClick={() => setBigImage(null)}>
          <img src={bigImage} alt="Big output screenshot" />
          <button type="button" className="close-btn" onClick={() => setBigImage(null)}>✕ Close</button>
        </div>
      )}
    </div>
  )
}

export default PracticalForm