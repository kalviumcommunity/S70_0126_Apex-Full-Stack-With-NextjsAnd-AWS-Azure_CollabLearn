'use client'

import { useState } from 'react'
import { Modal } from '@/components/common/Modal'

interface ManageMembersModalProps {
    isOpen: boolean
    onClose: () => void
    project: any
    onAddMember: (email: string) => void
    onRemoveMember: (memberId: string) => void
}

export function ManageMembersModal({
    isOpen,
    onClose,
    project,
    onAddMember,
    onRemoveMember
}: ManageMembersModalProps) {
    const [newMemberEmail, setNewMemberEmail] = useState('')

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault()
        if (newMemberEmail.trim()) {
            onAddMember(newMemberEmail)
            setNewMemberEmail('')
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Manage Project Members" maxWidth="lg">
            <div className="space-y-6">
                {/* Add Member Form */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Add New Member</h3>
                    <form onSubmit={handleAddMember} className="flex gap-2">
                        <input
                            type="email"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                            placeholder="Enter member email"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Add
                        </button>
                    </form>
                </div>

                {/* Current Members */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                        Current Members ({project?.members?.length || 0})
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {project?.members && project.members.length > 0 ? (
                            project.members.map((member: any) => (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-gray-900">Member {member.userId}</p>
                                            <p className="text-xs text-gray-500">
                                                {member.role === 'OWNER' ? '👑 Owner' : '👤 Member'}
                                            </p>
                                        </div>
                                    </div>
                                    {member.role !== 'OWNER' && (
                                        <button
                                            onClick={() => onRemoveMember(member.id)}
                                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm text-center py-4">No members yet</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
                    >
                        Done
                    </button>
                </div>
            </div>
        </Modal>
    )
}
