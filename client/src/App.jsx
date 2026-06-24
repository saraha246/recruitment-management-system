import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import JobListing from './pages/JobListing'
import PostJob from './pages/PostJob'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import ApplicationsInbox from './pages/ApplicationsInbox'

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobListing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
            <Route
        path="/post-job"
        element={
          <ProtectedRoute allowedRoles={['recruiter']}>
            <PostJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/applications"
  element={
    <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
      <ApplicationsInbox />
    </ProtectedRoute>
  }
/>
    </Routes>
  )
}

export default App