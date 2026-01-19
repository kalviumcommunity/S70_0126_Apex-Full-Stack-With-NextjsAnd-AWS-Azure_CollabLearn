'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function MentorLoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Simulate mentor authentication
        // In a real app, this would call your backend API
        setTimeout(() => {
            if (formData.email && formData.password) {
                // Mock mentor credentials check
                if (formData.email.includes('mentor') || formData.email.includes('sarah')) {
                    // Set mentor role in localStorage
                    localStorage.setItem('userRole', 'mentor')
                    localStorage.setItem('token', 'mock-mentor-token')
                    localStorage.setItem('user', JSON.stringify({
                        email: formData.email,
                        name: formData.email.split('@')[0],
                        role: 'MENTOR'
                    }))

                    // Redirect to mentor dashboard
                    router.push('/mentor/dashboard')
                } else {
                    setError('Invalid mentor credentials. Please use a mentor account.')
                    setLoading(false)
                }
            } else {
                setError('Please fill in all fields')
                setLoading(false)
            }
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-6">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            CollabLearn
                        </h1>
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Mentor Login</h2>
                    <p className="text-gray-800">Sign in to access your mentor dashboard</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Mentor Email
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="mentor@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In as Mentor'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-800">
                            Not a mentor?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                                Student Login
                            </Link>
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
                        <p className="text-xs text-blue-800">Email: sarah@mentor.com</p>
                        <p className="text-xs text-blue-800">Password: any password</p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-6 text-center">
                    <Link href="/" className="text-gray-800 hover:text-gray-900 text-sm font-medium">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
