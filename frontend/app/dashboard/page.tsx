'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@/types'

interface Stats {
  coursesEnrolled: number
  coursesCompleted: number
  studyGroups: number
  projectsCompleted: number
}

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const raw = localStorage.getItem('user')
    return raw ? (JSON.parse(raw) as User) : null
  })
  const [stats, setStats] = useState<Stats>({
    coursesEnrolled: 0,
    coursesCompleted: 0,
    studyGroups: 0,
    projectsCompleted: 0
  })

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')

    if (!token) {
      router.push('/login')
      return
    }

    // Simulate loading user data
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
    setUser(null)
    router.push('/')
  }

  const switchToMentor = () => {
    localStorage.setItem('userRole', 'mentor')
    router.push('/mentor/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              CollabLearn
            </span>
          </h1>
          <div className="flex items-center space-x-6">
            <span className="text-gray-600">Welcome, <strong className="text-gray-900">{user?.name || user?.email}</strong></span>
            <button
              onClick={switchToMentor}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-sm"
            >
              🎓 Mentor Mode
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition duration-200 font-medium"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Role Information */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-blue-800">
          You are in <strong>Student Mode</strong>. Click "🎓 Mentor Mode" to switch to mentor view if you're an instructor.
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 mb-12 shadow-lg">
          <h2 className="text-4xl font-bold mb-4">Welcome to CollabLearn!</h2>
          <p className="text-lg text-blue-100 mb-6">
            Start your learning journey today. Explore courses, join study groups, and collaborate with peers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 active:bg-gray-100 transition duration-200 transform hover:scale-105"
              onClick={() => router.push('/courses')}
            >
              Explore Courses
            </button>
            <button 
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200 transform hover:scale-105"
              onClick={() => router.push('/groups')}
            >
              Join Study Group
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.coursesEnrolled}</div>
            <p className="text-gray-600 text-sm">Courses Enrolled</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
            <div className="text-3xl font-bold text-indigo-600 mb-2">{stats.coursesCompleted}</div>
            <p className="text-gray-600 text-sm">Courses Completed</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.studyGroups}</div>
            <p className="text-gray-600 text-sm">Study Groups</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200 transform hover:-translate-y-1">
            <div className="text-3xl font-bold text-pink-600 mb-2">{stats.projectsCompleted}</div>
            <p className="text-gray-600 text-sm">Projects Completed</p>
          </div>
        </div>

        {/* Featured Courses Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Web Development Fundamentals',
                description: 'Learn HTML, CSS, and JavaScript basics',
                level: 'Beginner',
                students: '5,200'
              },
              {
                title: 'React & Modern JavaScript',
                description: 'Build interactive UIs with React',
                level: 'Intermediate',
                students: '3,800'
              },
              {
                title: 'Full Stack Development',
                description: 'Master frontend and backend development',
                level: 'Advanced',
                students: '2,100'
              }
            ].map((course, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow hover:shadow-xl transition duration-200 transform hover:-translate-y-1 overflow-hidden group cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-700 transition duration-200"></div>
                <div className="p-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition">{course.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">{course.level}</span>
                    <span>{course.students} students</span>
                  </div>
                  <button 
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200 font-medium"
                    onClick={() => router.push(`/courses/${idx}`)}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Groups Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Join a Study Group</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'JavaScript Learners',
                members: '342',
                description: 'Group for JavaScript learners of all levels'
              },
              {
                name: 'Web Development Masters',
                members: '567',
                description: 'Advanced web development techniques and best practices'
              },
              {
                name: 'React Study Circle',
                members: '289',
                description: 'Learn and discuss React frameworks and patterns'
              },
              {
                name: 'Open Source Contributors',
                members: '421',
                description: 'Contribute to open source and build real-world projects'
              }
            ].map((group, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow hover:shadow-xl transition duration-200 transform hover:-translate-y-1 p-6 group cursor-pointer">
                <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition">{group.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">{group.members} members</span>
                  <button 
                    className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white active:bg-blue-700 transition duration-200 font-medium text-sm"
                    onClick={() => router.push(`/groups/${idx}`)}
                  >
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
