'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { mockCourses } from '@/lib/mockData'
import { useState } from 'react'

export default function CourseDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const course = mockCourses.find(c => c.id === params.id)
    const [isEnrolled, setIsEnrolled] = useState(course?.enrolled || false)

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
                    <Link href="/courses" className="text-blue-600 hover:underline">
                        ← Back to Courses
                    </Link>
                </div>
            </div>
        )
    }

    const handleEnroll = () => {
        setIsEnrolled(!isEnrolled)
        // In a real app, this would make an API call
        alert(isEnrolled ? 'Unenrolled from course!' : 'Successfully enrolled in course!')
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center gap-3 mb-4">
                        <Link href="/courses" className="text-blue-100 hover:text-white text-sm font-medium">
                            Courses
                        </Link>
                        <span className="text-blue-200">/</span>
                        <span className="text-white text-sm font-medium">Details</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                            <p className="text-xl text-blue-100 mb-6">{course.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Level:</span>
                                    <span className="px-3 py-1 bg-white/20 rounded-full">{course.level}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Duration:</span>
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Rating:</span>
                                    <span className="flex items-center gap-1">
                                        <span className="text-yellow-300">★</span>
                                        {course.rating}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Students:</span>
                                    <span>{course.students.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            <button
                                onClick={handleEnroll}
                                className={`px-8 py-3 ${isEnrolled
                                        ? 'bg-white text-blue-600 hover:bg-blue-50'
                                        : 'bg-green-500 text-white hover:bg-green-600'
                                    } font-semibold rounded-lg transition text-lg`}
                            >
                                {isEnrolled ? '✓ Enrolled' : 'Enroll Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* What You'll Learn */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
                            <ul className="space-y-3">
                                {[
                                    'Master the fundamentals and advanced concepts',
                                    'Build real-world projects from scratch',
                                    'Learn industry best practices and patterns',
                                    'Get hands-on experience with modern tools',
                                    'Receive feedback from expert instructors',
                                    'Join a community of fellow learners'
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold text-xl">✓</span>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Course Modules */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Modules</h2>
                            <div className="space-y-3">
                                {Array.from({ length: course.modules }, (_, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full font-bold">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">Module {i + 1}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {i === 0 ? 'Introduction and Setup' :
                                                        i === course.modules - 1 ? 'Final Project' :
                                                            `Core Concepts Part ${i}`}
                                                </p>
                                            </div>
                                        </div>
                                        {isEnrolled ? (
                                            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium">
                                                Start →
                                            </button>
                                        ) : (
                                            <span className="text-gray-400">🔒</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Instructor */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Instructor</h3>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full"></div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{course.instructor}</h4>
                                    <p className="text-sm text-gray-600">Senior Mentor</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Expert instructor with years of experience in the field. Passionate about teaching and helping students succeed.
                            </p>
                            <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                                View Profile
                            </button>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Topics Covered</h3>
                            <div className="flex flex-wrap gap-2">
                                {course.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
