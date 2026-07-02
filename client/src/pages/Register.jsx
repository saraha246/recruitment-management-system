import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'candidate'
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setError('')

  //   try {
  //     const res = await axios.post('http://localhost:3000/api/v1/auth/signup', formData)

  //     localStorage.setItem('token', res.data.token)
  //     localStorage.setItem('user', JSON.stringify(res.data.data))

  //     navigate('/')
  //     window.location.reload()
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Registration failed')
  //   }
  // }

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await axios.post(
      'http://localhost:3000/api/v1/auth/signup',
      formData
    );

    // Go to OTP verification page
    navigate('/verify-otp', {
      state: {
        email: res.data.email
      }
    });

  } catch (err) {
    setError(err.response?.data?.message || 'Registration failed');
  }
};

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      <div className="flex items-center justify-center px-6 pt-12 pb-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-[#1A3A5C]">Create your account</h1>
            <p className="text-sm text-gray-500 mt-1">Join RecruitHub to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md mb-4 border border-red-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
                  required
                />
              </div>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E] bg-white"
            >
              <option value="candidate">Candidate — looking for jobs</option>
              <option value="recruiter">Recruiter — hiring talent</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[#0F766E] text-white text-sm font-medium py-2.5 rounded-md hover:bg-[#0c5d56] transition"
            >
              Create account
            </button>

            <p className="mt-5 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0F766E] font-medium hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register