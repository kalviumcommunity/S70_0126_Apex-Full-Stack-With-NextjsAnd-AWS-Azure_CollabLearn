'use client'

import { mockFeedback } from '@/lib/mockData'

export default function FeedbackPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Feedback</h1>
                <p className="text-gray-600 mb-8">See what your peers and mentors are saying about your work.</p>

                <div className="grid grid-cols-1 gap-6">
                    {mockFeedback.map(feedback => (
                        <div key={feedback.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900">Project Feedback</h3> {/* In real app, fetch project title */}
                                    <p className="text-sm text-gray-500">From User ID: {feedback.fromUserId}</p>
                                </div>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-xl ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg text-gray-700 italic border-l-4 border-blue-200">
                                "{feedback.comment}"
                            </div>

                            <p className="text-xs text-gray-400 mt-4 text-right">
                                Received on {new Date(feedback.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}

                    {mockFeedback.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500">No feedback received yet. Keep collaborating!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
