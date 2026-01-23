'use client'

import { mockUsers } from '@/lib/mockData'

export function MenteeList() {
    // Filter for students (mock logic)
    const mentees = mockUsers.filter(u => u.role === 'STUDENT')

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Your Mentees</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">+ Add New</button>
            </div>

            <div className="divide-y divide-gray-100">
                {mentees.map(mentee => (
                    <div key={mentee.id} className="p-6 hover:bg-gray-50 transition flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                {mentee.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{mentee.name}</h3>
                                <p className="text-sm text-gray-500">{mentee.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-gray-500">Progress</p>
                                <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-white hover:border-gray-400 transition">
                                Details
                            </button>
                        </div>
                    </div>
                ))}

                {mentees.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No mentees assigned yet.
                    </div>
                )}
            </div>
        </div>
    )
}
