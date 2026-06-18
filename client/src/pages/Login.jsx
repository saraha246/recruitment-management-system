import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/login', {
        email,
        password
      })

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.data))

      navigate('/')
      window.location.reload()
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <Navbar />

      <div className="flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-[#1A3A5C]">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-1">Log in to continue to RecruitHub</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-md mb-4 border border-red-100">
                {error}
              </div>
            )}

            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F766E]/40 focus:border-[#0F766E]"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#0F766E] text-white text-sm font-medium py-2.5 rounded-md hover:bg-[#0c5d56] transition"
            >
              Log in
            </button>

            <p className="mt-5 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#0F766E] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login