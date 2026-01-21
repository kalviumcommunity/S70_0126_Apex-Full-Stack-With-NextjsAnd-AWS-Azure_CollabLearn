'use client'

import { useState } from 'react'
import { Modal } from '@/components/common/Modal'

interface CreateProjectModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (projectData: any) => void
}

export function CreateProjectModal({ isOpen, onClose, onSubmit }: CreateProjectModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        onSubmit({
            ...formData,
            tags: tagsArray,
            status: 'ACTIVE',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        })
        setFormData({ title: '', description: '', tags: '' })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Project" maxWidth="lg">
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
                        Create Project
                    </button>
                </div>
            </form>
        </Modal>
    )
}
