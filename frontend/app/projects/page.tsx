'use client'

import { useState } from 'react'
import { mockProjects } from '@/lib/mockData'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { CreateProjectModal } from '@/components/projects/CreateProjectModal'

export default function ProjectsPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [projects, setProjects] = useState(mockProjects)

    const handleCreateProject = (projectData: any) => {
        const newProject = {
            id: `p${projects.length + 1}`,
            ...projectData,
            mentorId: 'u2',
            members: []
        }
        setProjects([newProject, ...projects])
        alert('Project created successfully!')
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                        <p className="text-gray-600 mt-2">Explore and join collaborative learning projects.</p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition lg:px-6"
                    >
                        + New Project
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {projects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No projects found. Be the first to create one!</p>
                    </div>
                )}
            </div>

            <CreateProjectModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateProject}
            />
        </div>
    )
}
