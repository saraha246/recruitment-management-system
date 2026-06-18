import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import JobListing from './pages/JobListing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobListing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
