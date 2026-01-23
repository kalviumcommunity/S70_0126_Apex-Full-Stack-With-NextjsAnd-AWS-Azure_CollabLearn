'use client'
import React from 'react'

/**
 * Reusable Button component with default styling
 * @param props - Standard HTML button attributes
 * @returns A styled button element
 */
type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: Props) {
  const { className, ...rest } = props
  
  return (
    <button 
      {...rest} 
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 ${className || ''}`}
    >
      {props.children}
    </button>
  )
}
