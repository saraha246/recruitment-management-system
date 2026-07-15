import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    location: '',
    salaryRange: '',
    jobType: 'full-time'
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await axios.post(
        'https://recruitment-management-system-production.up.railway.app/api/v1/jobs',
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )

      setSuccess(true)
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job')
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      <div className="max-w-xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-[#1A3A5C] mb-1">Post a new job</h1>
        <p className="text-sm text-gray-500 mb-6">Fill in the details below to publish a listing</p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md mb-4 border border-red-100">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-md mb-4 border border-green-100">
              Job posted successfully! Redirecting...
            </div>
          )}

          <label className="block text-sm font-medium text-gray-700 mb-1">Job title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Frontend Developer"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Role responsibilities and requirements"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
            required
          />

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                placeholder="Engineering"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Chennai"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary range</label>
              <input
                type="text"
                name="salaryRange"
                placeholder="10-15 LPA"
                value={formData.salaryRange}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E] bg-white"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F766E] text-white text-sm font-medium py-2.5 rounded-md hover:bg-[#0c5d56] transition"
          >
            Post job
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostJob