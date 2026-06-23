import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import JobListing from './pages/JobListing'
import PostJob from './pages/PostJob'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobListing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
