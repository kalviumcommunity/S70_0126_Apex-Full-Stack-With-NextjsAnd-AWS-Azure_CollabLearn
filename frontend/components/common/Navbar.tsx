'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CollabLearn
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition">
              Home
            </Link>
            <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition">
              How It Works
            </Link>
            <Link href="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
              Sign In
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-medium">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link href="/" className="block text-gray-600 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href="#features" className="block text-gray-600 hover:text-gray-900 font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="block text-gray-600 hover:text-gray-900 font-medium">
              How It Works
            </Link>
            <Link href="/login" className="block px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-medium text-center">
              Sign In
            </Link>
            <Link href="/signup" className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium text-center">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
