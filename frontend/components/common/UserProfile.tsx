'use client'

import { User } from '@/types'

interface UserProfileProps {
  user: User | null
  stats: {
    coursesEnrolled: number
    coursesCompleted: number
    studyGroups: number
    projectsCompleted: number
  }
}

export function UserProfile({ user, stats }: UserProfileProps) {
  if (!user) return null

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Profile Header */}
      <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mr-4">
          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {user.name || 'User'}
          </h2>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium mb-1">Enrolled Courses</p>
          <p className="text-3xl font-bold text-blue-600">{stats.coursesEnrolled}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-600">{stats.coursesCompleted}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium mb-1">Study Groups</p>
          <p className="text-3xl font-bold text-purple-600">{stats.studyGroups}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <p className="text-gray-600 text-sm font-medium mb-1">Projects</p>
          <p className="text-3xl font-bold text-orange-600">{stats.projectsCompleted}</p>
        </div>
      </div>
    </div>
  )
}
