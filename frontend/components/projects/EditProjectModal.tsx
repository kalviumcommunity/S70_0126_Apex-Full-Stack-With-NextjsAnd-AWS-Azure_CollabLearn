'use client'

import { useState } from 'react'
import { Modal } from '@/components/common/Modal'

interface EditProjectModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (projectData: any) => void
    project: any
}

export function EditProjectModal({ isOpen, onClose, onSubmit, project }: EditProjectModalProps) {
    const [formData, setFormData] = useState({
        title: project?.title || '',
        description: project?.description || '',
        tags: project?.tags?.join(', ') || '',
        status: project?.status || 'ACTIVE',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const tagsArray = formData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
        onSubmit({
            ...formData,
            tags: tagsArray,
            updatedAt: new Date().toISOString(),
        })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Project" maxWidth="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Title *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter project title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your project"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ON_HOLD">On Hold</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                    </label>
                    <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="React, Node.js, TypeScript (comma-separated)"
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    )
}
