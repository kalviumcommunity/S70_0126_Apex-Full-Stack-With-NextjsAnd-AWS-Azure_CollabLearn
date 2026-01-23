'use client'

import { mockProjects } from '@/lib/mockData'
import { ProjectCard } from '@/components/projects/ProjectCard'

export function CourseList() {
    // Using projects as "Courses" for now, as the schema implies a similarity
    const courses = mockProjects

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Create New Course
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                    <ProjectCard key={course.id} project={course} />
                ))}
            </div>
        </div>
    )
}
