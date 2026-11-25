
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

import practicalData, { initialSubjects } from './data/practicalData'

// Storage keys
const SUBJECTS_KEY = 'practitrack-subjects'
const PRACTICALS_KEY = 'practitrack-practicals'
const DEMO_SEED_KEY = 'practitrack-demo-seeded-v1'

// Read saved data safely
function readList(key) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// Prepare initial data and load demo records only once
function initializeAppData() {
  let subjects = readList(SUBJECTS_KEY)
  let practicals = readList(PRACTICALS_KEY)

  const alreadySeeded = localStorage.getItem(DEMO_SEED_KEY)

  if (!alreadySeeded) {
    // Seed demo records only when both lists are empty
    if (subjects.length === 0 && practicals.length === 0) {
      subjects = initialSubjects

      practicals = practicalData.map((practical) => ({
        ...practical,
        subjectId: practical.id <= 6 ? 1 : 2,
        number: String(practical.id),
        done: false
      }))

      localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects))
      localStorage.setItem(PRACTICALS_KEY, JSON.stringify(practicals))
    }

    // Remember that initial demo setup has been checked
    localStorage.setItem(DEMO_SEED_KEY, 'true')
  }

  return { subjects, practicals }
}

function App() {
  // Initialize both lists together
  const [initialData] = useState(initializeAppData)

  const [subjects, setSubjects] = useState(initialData.subjects)
  const [practicals, setPracticals] = useState(initialData.practicals)

  // Save subjects whenever they change
  useEffect(() => {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects))
  }, [subjects])

  // Save practicals whenever they change
  useEffect(() => {
    localStorage.setItem(PRACTICALS_KEY, JSON.stringify(practicals))
  }, [practicals])

  // ----- subject functions -----

  function addSubject(data) {
    const newSubject = {
      id: Date.now(),
      name: data.name.trim(),
      code: data.code.trim(),
      description: data.description.trim()
    }

    setSubjects([...subjects, newSubject])
  }

  function updateSubject(id, data) {
    setSubjects(subjects.map((s) => (
      s.id === id ? { ...s, ...data } : s
    )))
  }

  function deleteSubject(id) {
    setSubjects(subjects.filter((s) => s.id !== id))

    // Also remove practicals belonging to this subject
    setPracticals(practicals.filter((p) => p.subjectId !== id))
  }

  // ----- practical functions -----

  function addPractical(data) {
    const newPractical = {
      ...data,
      id: Date.now(),
      done: false
    }

    setPracticals([...practicals, newPractical])
  }

  function updatePractical(id, data) {
    setPracticals(practicals.map((p) => (
      p.id === id ? { ...p, ...data } : p
    )))
  }

  function deletePractical(id) {
    setPracticals(practicals.filter((p) => p.id !== id))
  }

  // Mark practical as completed or undo it
  function toggleComplete(id) {
    setPracticals(practicals.map((p) => (
      p.id === id ? { ...p, done: !p.done } : p
    )))
  }

  return (
    <>
      <Navbar practicals={practicals} />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home subjects={subjects} practicals={practicals} />}
          />

          <Route
            path="/subjects"
            element={
              <Subjects
                subjects={subjects}
                practicals={practicals}
                deleteSubject={deleteSubject}
              />
            }
          />

          <Route
            path="/subjects/add"
            element={
              <SubjectForm
                key="add"
                subjects={subjects}
                addSubject={addSubject}
              />
            }
          />

          <Route
            path="/subjects/:id"
            element={
              <SubjectDetails
                subjects={subjects}
                practicals={practicals}
                toggleComplete={toggleComplete}
                deletePractical={deletePractical}
                deleteSubject={deleteSubject}
              />
            }
          />

          <Route
            path="/subjects/:id/edit"
            element={
              <SubjectForm
                key="edit"
                subjects={subjects}
                updateSubject={updateSubject}
              />
            }
          />

          <Route
            path="/subjects/:id/practicals/add"
            element={
              <PracticalForm
                key="add1"
                mode="add"
                subjects={subjects}
                practicals={practicals}
                addPractical={addPractical}
              />
            }
          />

          <Route
            path="/practicals/add"
            element={
              <PracticalForm
                key="add2"
                mode="add"
                subjects={subjects}
                practicals={practicals}
                addPractical={addPractical}
              />
            }
          />

          <Route
            path="/practicals/:id"
            element={
              <PracticalDetails
                subjects={subjects}
                practicals={practicals}
                toggleComplete={toggleComplete}
                deletePractical={deletePractical}
              />
            }
          />

          <Route
            path="/practicals/:id/edit"
            element={
              <PracticalForm
                key="edit"
                mode="edit"
                subjects={subjects}
                practicals={practicals}
                updatePractical={updatePractical}
              />
            }
          />

          <Route
            path="/progress"
            element={<Progress subjects={subjects} practicals={practicals} />}
          />

          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer practicals={practicals} />
    </>
  )
}

export default App
