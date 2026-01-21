'use client'

import { MenteeList } from '@/components/mentor/MenteeList'

export default function MentorMenteesPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header handled by Layout or Navigation component usually, but adding spacer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Mentee Management</h1>
                <MenteeList />
            </div>
        </div>
    )
}
