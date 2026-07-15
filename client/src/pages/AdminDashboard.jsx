import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          'https://recruitment-management-system-production.up.railway.app/api/v1/admin/users',
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        setUsers(res.data.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(
        `https://recruitment-management-system-production.up.railway.app/api/v1/admin/users/${id}/deactivate`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setUsers(users.map(u => u.id === id ? { ...u, isActive: false } : u))
    } catch (err) {
      alert('Failed to deactivate user')
    }
  }

  const roleBadgeColor = (role) => {
    if (role === 'admin') return 'bg-purple-100 text-purple-700'
    if (role === 'recruiter') return 'bg-blue-100 text-blue-700'
    return 'bg-[#0F766E]/10 text-[#0F766E]'
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-[#1A3A5C] mb-1">User management</h1>
        <p className="text-sm text-gray-500 mb-6">View and manage all users on the platform</p>

        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-sm text-gray-500">
            Loading users...
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-md border border-red-100">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Email</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Role</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-right px-5 py-3 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-5 py-3 text-gray-800">{u.firstName} {u.lastName}</td>
                    <td className="px-5 py-3 text-gray-500">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${roleBadgeColor(u.userType)}`}>
                        {u.userType}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {u.isActive && (
                        <button
                          onClick={() => handleDeactivate(u.id)}
                          className="text-xs font-medium text-red-600 hover:underline"
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard