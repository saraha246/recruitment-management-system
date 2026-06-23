import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
    window.location.reload()
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-[#1A3A5C] tracking-tight">
          RecruitHub
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            {user.userType === 'recruiter' && (
              <Link to="/post-job" className="text-sm font-medium text-[#0F766E] hover:underline">
                + Post a job
              </Link>
            )}
            {user.userType === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-[#0F766E] hover:underline">
                Admin panel
              </Link>
            )}
            <span className="text-sm text-gray-600">
              {user.firstName} <span className="text-gray-400">·</span> <span className="capitalize text-[#0F766E] font-medium">{user.userType}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-600 hover:text-[#1A3A5C] px-3 py-1.5 rounded-md transition"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#1A3A5C] px-3 py-1.5 transition">
              Log in
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium bg-[#0F766E] text-white px-4 py-1.5 rounded-md hover:bg-[#0c5d56] transition"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar