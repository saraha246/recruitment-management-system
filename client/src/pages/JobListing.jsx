import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { requestFcmToken } from '../firebase'
function JobListing() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applyingId, setApplyingId] = useState(null)
  const [appliedIds, setAppliedIds] = useState([])
  const navigate = useNavigate()

  // const user = JSON.parse(localStorage.getItem('user'))
const user = JSON.parse(localStorage.getItem('user') || 'null')

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

useEffect(() => {
    const setupNotifications = async () => {
      try {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') return

        let registration = await navigator.serviceWorker.getRegistration('/')

        if (!registration) {
  registration = await navigator.serviceWorker.register(
    '/firebase-messaging-sw.js',
    { scope: '/' }
  )
}

console.log('Registration:', registration)
console.log('Active:', registration?.active)
console.log('Waiting:', registration?.waiting)
console.log('Installing:', registration?.installing)

const token = await requestFcmToken(
  'BKzKcfFABuNcDc1pObRsqRM4W-rGiwh5WSpI_HzLlIqQgFdSnnqd2osn7jebyt6jIrU6yFmnmZfpURFHeUlaJQI',
  registration
)

console.log('FCM Token:', token)

        if (token && user) {

          console.log("Sending token to backend...")

          await axios.post('http://localhost:3000/api/v1/users/fcm-token',
            { fcmToken: token },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
          )
          console.log("Token saved successfully")
        }
      } catch (err) {
        console.log('Notification permission error:', err)
      }
    }

    if (user) setupNotifications()
}, [])

  const handleApply = (jobId) => {
    if (!user) {
      navigate('/login')
      return
    }

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf'

    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return

      setApplyingId(jobId)
      try {
        const formData = new FormData()
        formData.append('jobId', jobId)
        formData.append('resume', file)

        await axios.post(
          'http://localhost:3000/api/v1/applications',
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        setAppliedIds([...appliedIds, jobId])
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to apply')
      } finally {
        setApplyingId(null)
      }
    }

    input.click()
  }

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
          {jobs.map((job) => {
            const alreadyApplied = appliedIds.includes(job.id)
            return (
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
                  {(!user || user?.userType === 'candidate') && (
                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={applyingId === job.id || alreadyApplied}
                      className="text-sm font-medium bg-[#0F766E] text-white px-4 py-1.5 rounded-md hover:bg-[#0c5d56] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {alreadyApplied ? 'Applied ✓' : applyingId === job.id ? 'Applying...' : 'Apply now'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default JobListing