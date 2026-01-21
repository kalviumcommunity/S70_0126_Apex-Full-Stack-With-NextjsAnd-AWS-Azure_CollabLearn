'use client'

import { useParams, useRouter } from 'next/navigation'
import { mockProjects, mockTasks } from '@/lib/mockData'
import { TaskBoard } from '@/components/tasks/TaskBoard'
import { EditProjectModal } from '@/components/projects/EditProjectModal'
import { ManageMembersModal } from '@/components/projects/ManageMembersModal'
import Link from 'next/link'
import { useState } from 'react'

export default function ProjectDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [project, setProject] = useState(mockProjects.find(p => p.id === params.id))
    const tasks = mockTasks.filter(t => t.projectId === params.id)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isMembersModalOpen, setIsMembersModalOpen] = useState(false)

    const handleEditProject = (projectData: any) => {
        setProject(prev => prev ? { ...prev, ...projectData } : prev)
        alert('Project updated successfully!')
    }

    const handleAddMember = (email: string) => {
        alert(`Invitation sent to ${email}`)
    }

    const handleRemoveMember = (memberId: string) => {
        if (confirm('Are you sure you want to remove this member?')) {
            setProject(prev => prev ? {
                ...prev,
                members: prev.members?.filter(m => m.id !== memberId)
            } : prev)
            alert('Member removed successfully!')
        }
    }


    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Project Not Found</h2>
                    <Link href="/projects" className="text-blue-600 hover:underline mt-2 inline-block">
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Link href="/projects" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                                    Projects
                                </Link>
                                <span className="text-gray-300">/</span>
                                <span className="text-gray-900 text-sm font-medium">Details</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
                            <p className="text-gray-600 max-w-3xl">{project.description}</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsMembersModalOpen(true)}
                                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition font-medium border border-indigo-200"
                            >
                                Manage Members
                            </button>
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Edit Project
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mt-8">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Status:</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                {project.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Mentor:</span>
                            <span>Sarah Mentor</span> {/* Mock data for now */}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium text-gray-900">Members:</span>
                            <span>{project.members?.length || 0}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Project Tasks</h2>
                    <div className="flex gap-2">
                        <div className="bg-white border rounded-lg px-3 py-1.5 flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> High
                        </div>
                        <div className="bg-white border rounded-lg px-3 py-1.5 flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span> Medium
                        </div>
                        <div className="bg-white border rounded-lg px-3 py-1.5 flex items-center text-sm text-gray-600">
                            <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span> Low
                        </div>
                    </div>
                </div>

                <TaskBoard tasks={tasks} />
            </div>

            {/* Modals */}
            <EditProjectModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditProject}
                project={project}
            />
            <ManageMembersModal
                isOpen={isMembersModalOpen}
                onClose={() => setIsMembersModalOpen(false)}
                project={project}
                onAddMember={handleAddMember}
                onRemoveMember={handleRemoveMember}
            />
        </div>
    )
}
