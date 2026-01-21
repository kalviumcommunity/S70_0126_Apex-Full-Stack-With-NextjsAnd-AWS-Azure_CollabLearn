'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockCourses } from '@/lib/mockData'

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedLevel, setSelectedLevel] = useState<string>('all')

    const filteredCourses = mockCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
        return matchesSearch && matchesLevel
    })

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Courses</h1>
                    <p className="text-gray-600">Discover courses to accelerate your learning journey</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search Courses</label>
                            <input
                                type="text"
                                placeholder="Search by title or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                            <select
                                value={selectedLevel}
                                onChange={(e) => setSelectedLevel(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Levels</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.id}`}
                            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden group"
                        >
                            <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-700 transition"></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition">
                                        {course.title}
                                    </h3>
                                    {course.enrolled && (
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                                            Enrolled
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                                        {course.level}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">★</span>
                                        <span className="font-semibold text-gray-900">{course.rating}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>{course.students.toLocaleString()} students</span>
                                    <span>{course.modules} modules</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {course.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Instructor:</span> {course.instructor}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
                    </div>
                )}

                {/* Back to Dashboard */}
                <div className="mt-8">
                    <Link
                        href="/dashboard"
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}
