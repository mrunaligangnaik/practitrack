import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Subjects from './pages/Subjects'
import SubjectForm from './pages/SubjectForm'
import SubjectDetails from './pages/SubjectDetails'
import PracticalForm from './pages/PracticalForm'
import PracticalDetails from './pages/PracticalDetails'
import Progress from './pages/Progress'
import About from './pages/About'
import NotFound from './pages/NotFound'

// read a list from LocalStorage (empty list if nothing is saved)
function loadList(key) {
  const saved = localStorage.getItem(key)
  if (saved) {
    return JSON.parse(saved)
  }
  return []
}

function App() {
  const [subjects, setSubjects] = useState(() => loadList('practitrack-subjects'))
  const [practicals, setPracticals] = useState(() => loadList('practitrack-practicals'))

  // save to LocalStorage whenever the lists change
  useEffect(() => {
    localStorage.setItem('practitrack-subjects', JSON.stringify(subjects))
  }, [subjects])

  useEffect(() => {
    localStorage.setItem('practitrack-practicals', JSON.stringify(practicals))
  }, [practicals])

  // ----- subject functions -----
  function addSubject(data) {
    const newSubject = {
      id: Date.now(), // unique id from current time
      name: data.name.trim(),
      code: data.code.trim(),
      description: data.description.trim()
    }
    setSubjects([...subjects, newSubject])
  }

  function updateSubject(id, data) {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, ...data } : s)))
  }

  function deleteSubject(id) {
    setSubjects(subjects.filter((s) => s.id !== id))
    // also remove all practicals of this subject
    setPracticals(practicals.filter((p) => p.subjectId !== id))
  }

  // ----- practical functions -----
  function addPractical(data) {
    const newPractical = { ...data, id: Date.now(), done: false }
    setPracticals([...practicals, newPractical])
  }

  function updatePractical(id, data) {
    setPracticals(practicals.map((p) => (p.id === id ? { ...p, ...data } : p)))
  }

  function deletePractical(id) {
    setPracticals(practicals.filter((p) => p.id !== id))
  }

  // mark as completed, or undo
  function toggleComplete(id) {
    setPracticals(practicals.map((p) => (p.id === id ? { ...p, done: !p.done } : p)))
  }

  return (
    <>
      <Navbar practicals={practicals} />
      <main>
        <Routes>
          <Route path="/" element={<Home subjects={subjects} practicals={practicals} />} />

          <Route path="/subjects" element={<Subjects subjects={subjects} practicals={practicals} deleteSubject={deleteSubject} />} />
          <Route path="/subjects/add" element={<SubjectForm key="add" subjects={subjects} addSubject={addSubject} />} />
          <Route path="/subjects/:id" element={<SubjectDetails subjects={subjects} practicals={practicals} toggleComplete={toggleComplete} deletePractical={deletePractical} deleteSubject={deleteSubject} />} />
          <Route path="/subjects/:id/edit" element={<SubjectForm key="edit" subjects={subjects} updateSubject={updateSubject} />} />

          <Route path="/subjects/:id/practicals/add" element={<PracticalForm key="add1" mode="add" subjects={subjects} practicals={practicals} addPractical={addPractical} />} />
          <Route path="/practicals/add" element={<PracticalForm key="add2" mode="add" subjects={subjects} practicals={practicals} addPractical={addPractical} />} />
          <Route path="/practicals/:id" element={<PracticalDetails subjects={subjects} practicals={practicals} toggleComplete={toggleComplete} deletePractical={deletePractical} />} />
          <Route path="/practicals/:id/edit" element={<PracticalForm key="edit" mode="edit" subjects={subjects} practicals={practicals} updatePractical={updatePractical} />} />

          <Route path="/progress" element={<Progress subjects={subjects} practicals={practicals} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer practicals={practicals} />
    </>
  )
}

export default App