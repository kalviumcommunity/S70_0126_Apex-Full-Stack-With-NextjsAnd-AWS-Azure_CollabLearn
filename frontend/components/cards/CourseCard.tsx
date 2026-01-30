import React from 'react'

type CourseCardProps = {
  title?: string
  description?: string
  instructor?: string
  duration?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced'
}

export default function CourseCard({
  title = 'Course title',
  description = 'Short description',
  instructor,
  duration,
  level = 'Beginner'
}: CourseCardProps) {
  const levelColors = {
    Beginner: 'bg-green-100 text-green-700 border-green-200',
    Intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
    Advanced: 'bg-purple-100 text-purple-700 border-purple-200'
  }

  return (
    <article className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-blue-300 group">
      {/* Header with title and badge */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${levelColors[level]}`}>
          {level}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      {/* Footer with instructor and duration */}
      {(instructor || duration) && (
        <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
          {instructor && (
            <div className="flex items-center gap-1">
              <span className="font-medium">👨‍🏫</span>
              <span>{instructor}</span>
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-1">
              <span className="font-medium">⏱️</span>
              <span>{duration}</span>
            </div>
          )}
        </div>
      )}

      {/* Gradient accent line */}
      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 mt-4" />
    </article>
  )
}
