import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function JobListing() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/jobs')
        setJobs(res.data.data)
      } catch (err) {
        setError('Failed to load jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#1A3A5C]">Open positions</h1>
          <p className="text-sm text-gray-500 mt-1">
            {user?.userType === 'recruiter'
              ? 'Manage your job postings and review applicants'
              : 'Browse roles and apply in a few clicks'}
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-sm text-gray-500">
            Loading jobs...
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-md border border-red-100">
            {error}
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
            <p className="text-gray-500 text-sm">No jobs posted yet.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-[#1A3A5C]">{job.title}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {job.department} <span className="text-gray-300">•</span> {job.location}
                  </p>
                </div>
                <span className="text-xs font-medium bg-[#0F766E]/10 text-[#0F766E] px-2.5 py-1 rounded-full capitalize">
                  {job.jobType}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{job.description}</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-700">{job.salaryRange}</span>
                {user?.userType === 'candidate' && (
                  <button className="text-sm font-medium bg-[#0F766E] text-white px-4 py-1.5 rounded-md hover:bg-[#0c5d56] transition">
                    Apply now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default JobListing