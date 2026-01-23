'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockStudyGroups } from '@/lib/mockData'

export default function StudyGroupsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [groups, setGroups] = useState(mockStudyGroups)

    const filteredGroups = groups.filter(group => {
        const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            group.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const categories = ['all', ...Array.from(new Set(mockStudyGroups.map(g => g.category)))]

    const handleJoinToggle = (groupId: string) => {
        setGroups(groups.map(group =>
            group.id === groupId
                ? { ...group, isJoined: !group.isJoined, members: group.isJoined ? group.members - 1 : group.members + 1 }
                : group
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Groups</h1>
                    <p className="text-gray-600">Join study groups to collaborate and learn together</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search Groups</label>
                            <input
                                type="text"
                                placeholder="Search by name or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredGroups.map((group) => (
                        <div key={group.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{group.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                        {group.category}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-semibold">👥 Members:</span>
                                    <span>{group.members}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-semibold">📅 Schedule:</span>
                                    <span>{group.meetingSchedule}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Topics:</p>
                                <div className="flex flex-wrap gap-2">
                                    {group.topics.map(topic => (
                                        <span key={topic} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => handleJoinToggle(group.id)}
                                className={`w-full px-4 py-2 rounded-lg font-medium transition ${group.isJoined
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                {group.isJoined ? '✓ Joined' : 'Join Group'}
                            </button>
                        </div>
                    ))}
                </div>

                {filteredGroups.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No study groups found matching your criteria.</p>
                    </div>
                )}

                {/* Back to Dashboard */}
                <div className="mt-8">
                    <Link
                        href="/dashboard"
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}
