import Link from 'next/link'

export function RoleSwitcher() {
  const currentRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') || 'student' : 'student'

  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-blue-900">Switch Account Type</h3>
          <p className="text-sm text-blue-700 mt-1">
            You are currently logged in as a <strong>{currentRole}</strong>
          </p>
        </div>
        <Link
          href="/mentor/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
        >
          Switch to Mentor Mode
        </Link>
      </div>
    </div>
  )
}
