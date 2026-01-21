'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function MenteeProgressPage() {
    const params = useParams()
    const router = useRouter()

    const mentee = {
        id: params.id,
        name: 'John Doe',
        email: 'john@example.com',
        joinedDate: '2 months ago',
        progress: 75,
        coursesEnrolled: 3,
        coursesCompleted: 1,
        totalHours: 45,
        status: 'Active'
    }

    const courses = [
        { id: 1, name: 'React Fundamentals', progress: 100, status: 'Completed', grade: 'A' },
        { id: 2, name: 'Advanced JavaScript', progress: 75, status: 'In Progress', grade: '-' },
        { id: 3, name: 'Full Stack Development', progress: 25, status: 'In Progress', grade: '-' }
    ]

    const recentActivity = [
        { date: '2 hours ago', activity: 'Completed Module 5 in Advanced JavaScript' },
        { date: '1 day ago', activity: 'Submitted assignment for React Fundamentals' },
        { date: '3 days ago', activity: 'Started Full Stack Development course' },
        { date: '1 week ago', activity: 'Achieved 100% in React Fundamentals' }
    ]

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/mentor/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
                        Mentor Dashboard
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900 font-medium">Mentee Progress</span>
                </div>

                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full"></div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{mentee.name}</h1>
                                <p className="text-gray-600">{mentee.email}</p>
                                <p className="text-sm text-gray-500 mt-1">Joined {mentee.joinedDate}</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => router.push('/messages')}
                                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
                            >
                                Message
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                                Schedule Session
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-2">Overall Progress</p>
                        <div className="text-3xl font-bold text-blue-600 mb-2">{mentee.progress}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${mentee.progress}%` }}></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-2">Courses Enrolled</p>
                        <div className="text-3xl font-bold text-indigo-600">{mentee.coursesEnrolled}</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-2">Courses Completed</p>
                        <div className="text-3xl font-bold text-green-600">{mentee.coursesCompleted}</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <p className="text-gray-600 text-sm mb-2">Total Hours</p>
                        <div className="text-3xl font-bold text-purple-600">{mentee.totalHours}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Course Progress */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Course Progress</h2>
                        <div className="space-y-4">
                            {courses.map((course) => (
                                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900">{course.name}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${course.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {course.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Progress: {course.progress}%</span>
                                        <span className="text-sm font-semibold text-gray-900">Grade: {course.grade}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${course.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'}`}
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            {recentActivity.map((item, idx) => (
                                <div key={idx} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0">
                                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-gray-900">{item.activity}</p>
                                        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
