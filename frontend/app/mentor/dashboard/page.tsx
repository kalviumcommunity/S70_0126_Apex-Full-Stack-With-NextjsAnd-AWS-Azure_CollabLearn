'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function MentorDashboard() {
  const router = useRouter()
  const [mentor, setMentor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    const userRole = localStorage.getItem('userRole')

    if (!token) {
      router.push('/login')
      return
    }

    // Check if user is a mentor (in real app, this would come from backend)
    if (userRole !== 'mentor') {
      // Redirect to student dashboard if not a mentor
      router.push('/dashboard')
      return
    }

    if (userData) {
      setMentor(JSON.parse(userData))
    }
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Mentor Dashboard
                </span>
              </h1>
              <p className="text-gray-600 mt-1">Manage your mentees and courses</p>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-600">Welcome, <strong>{mentor?.name || mentor?.email}</strong></span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'mentees', label: 'My Mentees', icon: '👥' },
              { id: 'courses', label: 'My Courses', icon: '📚' },
              { id: 'feedback', label: 'Feedback', icon: '⭐' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Mentees</p>
                    <div className="text-3xl font-bold text-blue-600 mt-2">12</div>
                  </div>
                  <div className="text-4xl">👥</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Courses Created</p>
                    <div className="text-3xl font-bold text-indigo-600 mt-2">5</div>
                  </div>
                  <div className="text-4xl">📚</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Avg Rating</p>
                    <div className="text-3xl font-bold text-yellow-500 mt-2">4.8</div>
                  </div>
                  <div className="text-4xl">⭐</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Hours</p>
                    <div className="text-3xl font-bold text-green-600 mt-2">187</div>
                  </div>
                  <div className="text-4xl">⏱️</div>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">Welcome back, mentor! 🎓</h2>
              <p className="text-lg text-blue-100 mb-6">
                You're making a real impact on your mentees' learning journeys. Keep up the great work!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                  Create New Course
                </button>
                <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                  View Mentee Progress
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Mentee Activity</h3>
                <div className="space-y-4">
                  {[
                    { name: 'John Doe', action: 'Completed Module 3', time: '2 hours ago', icon: '✅' },
                    { name: 'Sarah Smith', action: 'Asked a question', time: '5 hours ago', icon: '❓' },
                    { name: 'Mike Johnson', action: 'Submitted assignment', time: '1 day ago', icon: '📤' },
                    { name: 'Emma Wilson', action: 'Started new course', time: '2 days ago', icon: '🚀' }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{activity.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{activity.name}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats This Month</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-gray-600">Total Sessions Completed</span>
                    <span className="text-2xl font-bold text-blue-600">24</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-gray-600">Questions Answered</span>
                    <span className="text-2xl font-bold text-indigo-600">87</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-gray-600">New Mentees</span>
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Mentee Satisfaction</span>
                    <span className="text-2xl font-bold text-yellow-500">4.7/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mentees Tab */}
        {activeTab === 'mentees' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Mentees</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                + Add Mentee
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 1, name: 'John Doe', email: 'john@example.com', progress: 75, joinDate: '2 months ago', status: 'Active' },
                { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', progress: 60, joinDate: '1 month ago', status: 'Active' },
                { id: 3, name: 'Mike Johnson', email: 'mike@example.com', progress: 85, joinDate: '3 months ago', status: 'Active' },
                { id: 4, name: 'Emma Wilson', email: 'emma@example.com', progress: 45, joinDate: '2 weeks ago', status: 'Active' }
              ].map((mentee) => (
                <div key={mentee.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{mentee.name}</h3>
                      <p className="text-sm text-gray-600">{mentee.email}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {mentee.status}
                    </span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">{mentee.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${mentee.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Joined {mentee.joinDate}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-medium">
                      View Progress
                    </button>
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                + Create Course
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 1, title: 'Advanced React Patterns', students: 45, rating: 4.8, modules: 8, status: 'Published' },
                { id: 2, title: 'Full Stack Development', students: 32, rating: 4.7, modules: 12, status: 'Published' },
                { id: 3, title: 'JavaScript Mastery', students: 28, rating: 4.9, modules: 10, status: 'Published' },
                { id: 4, title: 'Web Performance', students: 0, rating: 0, modules: 5, status: 'Draft' }
              ].map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                  <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-600"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        course.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{course.students}</p>
                        <p className="text-xs text-gray-600">Students</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-yellow-500">{course.rating || '-'}</p>
                        <p className="text-xs text-gray-600">Rating</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-indigo-600">{course.modules}</p>
                        <p className="text-xs text-gray-600">Modules</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm font-medium">
                        Edit
                      </button>
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mentor Reviews & Feedback</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-5xl font-bold text-yellow-500 mb-2">4.8</div>
                <p className="text-gray-600 text-lg">Average Rating</p>
                <div className="flex justify-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">247</div>
                <p className="text-gray-600 text-lg">Total Reviews</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">98%</div>
                <p className="text-gray-600 text-lg">Would Recommend</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Latest Reviews</h3>
            <div className="space-y-4">
              {[
                { student: 'John Doe', rating: 5, comment: 'Excellent mentor! Very knowledgeable and patient. Highly recommend!' },
                { student: 'Sarah Smith', rating: 5, comment: 'Amazing teaching style. Helped me understand complex concepts easily.' },
                { student: 'Mike Johnson', rating: 4, comment: 'Great mentor. Would appreciate more response time on messages.' },
                { student: 'Emma Wilson', rating: 5, comment: 'Perfect balance between theory and practical examples. Thank you!' }
              ].map((review, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-gray-900">{review.student}</h4>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">⭐</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mentor Profile</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{mentor?.name}</h3>
                  <p className="text-gray-600 mb-4">Senior Mentor</p>
                  <div className="space-y-2 mb-6 text-left">
                    <p className="text-sm text-gray-600"><strong>Email:</strong> {mentor?.email}</p>
                    <p className="text-sm text-gray-600"><strong>Experience:</strong> 5+ years</p>
                    <p className="text-sm text-gray-600"><strong>Expertise:</strong> Web Development</p>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                    Edit Profile
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">About You</h3>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Tell mentees about your experience and expertise..."
                        defaultValue="Passionate educator with 5+ years of experience in web development. Specializing in React, Node.js, and full-stack development."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., React, Node.js, Python"
                        defaultValue="React, Node.js, Full Stack Development"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Availability (hours per week)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="20"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
