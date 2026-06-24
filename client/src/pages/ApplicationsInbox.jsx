import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function ApplicationsInbox() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const statusOptions = ['applied', 'shortlisted', 'interview', 'offer', 'hired', 'rejected']

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3000/api/v1/applications',
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        setApplications(res.data.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load applications')
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id)
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/applications/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setApplications(applications.map(a => a.id === id ? { ...a, status: newStatus } : a))
    } catch (err) {
      alert('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  const statusColor = (status) => {
    const map = {
      applied: 'bg-gray-100 text-gray-700',
      shortlisted: 'bg-blue-100 text-blue-700',
      interview: 'bg-amber-100 text-amber-700',
      offer: 'bg-purple-100 text-purple-700',
      hired: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700'
    }
    return map[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-[#1A3A5C] mb-1">Applications</h1>
        <p className="text-sm text-gray-500 mb-6">Review candidates and manage their status</p>

        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-sm text-gray-500">
            Loading applications...
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-md border border-red-100">
            {error}
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
            <p className="text-gray-500 text-sm">No applications yet.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-xl border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-base font-semibold text-[#1A3A5C]">
                    {app.candidate?.firstName} {app.candidate?.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">{app.candidate?.email}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Applied for <span className="font-medium text-gray-800">{app.Job?.title}</span>
                    <span className="text-gray-400"> · </span>
                    {app.Job?.department}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                {app.resumePath ? (
                  <span className="text-sm text-[#0F766E] font-medium">📄 Resume attached</span>
                ) : (
                  <span className="text-sm text-gray-400">No resume uploaded</span>
                )}

                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  disabled={updatingId === app.id}
                  className="text-sm border border-gray-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 bg-white capitalize"
                >
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt} className="capitalize">{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ApplicationsInbox