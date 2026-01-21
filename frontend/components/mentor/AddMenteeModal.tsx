'use client'

import { useState } from 'react'
import { Modal } from '@/components/common/Modal'

interface AddMenteeModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (menteeData: any) => void
}

export function AddMenteeModal({ isOpen, onClose, onSubmit }: AddMenteeModalProps) {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        setFormData({ email: '', name: '' })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Mentee" maxWidth="md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mentee Email *
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="mentee@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mentee Name *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter mentee name"
                    />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Note:</strong> An invitation email will be sent to the mentee with instructions to join your mentorship program.
                    </p>
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
                        Send Invitation
                    </button>
                </div>
            </form>
        </Modal>
    )
}
