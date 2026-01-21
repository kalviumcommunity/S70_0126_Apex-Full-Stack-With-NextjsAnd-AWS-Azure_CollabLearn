'use client'

import { useState } from 'react'
import { Modal } from '@/components/common/Modal'

interface CreateCourseModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (courseData: any) => void
}

export function CreateCourseModal({ isOpen, onClose, onSubmit }: CreateCourseModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        level: 'Beginner',
        modules: 8,
        duration: '6 weeks',
        tags: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const tagsArray = formData.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
        onSubmit({
            ...formData,
            tags: tagsArray,
            students: 0,
            rating: 0,
            status: 'Draft'
        })
        setFormData({ title: '', description: '', level: 'Beginner', modules: 8, duration: '6 weeks', tags: '' })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Course" maxWidth="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter course title"
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
                        placeholder="Describe your course"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Level
                        </label>
                        <select
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Modules
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.modules}
                            onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                    </label>
                    <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 6 weeks, 3 months"
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
                        placeholder="React, JavaScript, Web Development (comma-separated)"
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
                        Create Course
                    </button>
                </div>
            </form>
        </Modal>
    )
}
