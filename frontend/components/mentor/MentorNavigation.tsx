'use client'

import Link from 'next/link'
import { useState } from 'react'

export function MentorNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white border-b border-gray-200 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Mentor Mode:</span>
          <div className="flex gap-2">
            <Link
              href="/mentor/dashboard"
              className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/mentor/mentees"
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm font-medium"
            >
              Mentees
            </Link>
            <Link
              href="/mentor/courses"
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm font-medium"
            >
              Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
