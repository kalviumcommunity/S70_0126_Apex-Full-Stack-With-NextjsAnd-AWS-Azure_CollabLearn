'use client'

import Link from 'next/link'

export default function MessagesPage() {
    const conversations = [
        { id: 1, name: 'Sarah Mentor', lastMessage: 'Great work on your project!', time: '2 hours ago', unread: 2 },
        { id: 2, name: 'Mike Peer', lastMessage: 'Can you help me with this task?', time: '5 hours ago', unread: 0 },
        { id: 3, name: 'Study Group: React Circle', lastMessage: 'Meeting tomorrow at 8 PM', time: '1 day ago', unread: 5 }
    ]

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Messages</h1>
                    <p className="text-gray-600">Communicate with mentors and peers</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Conversations List */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-sm">
                        <div className="p-4 border-b border-gray-200">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="divide-y divide-gray-200">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    className="p-4 hover:bg-gray-50 cursor-pointer transition"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex-shrink-0"></div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-semibold text-gray-900 truncate">{conv.name}</h3>
                                                {conv.unread > 0 && (
                                                    <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                        {conv.unread}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                                            <p className="text-xs text-gray-500 mt-1">{conv.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message View */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm flex flex-col" style={{ height: '600px' }}>
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Select a conversation</h2>
                        </div>

                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <div className="text-6xl mb-4">💬</div>
                                <p className="text-lg">Select a conversation to start messaging</p>
                                <p className="text-sm mt-2">This feature is coming soon!</p>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    disabled
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                />
                                <button
                                    disabled
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

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
