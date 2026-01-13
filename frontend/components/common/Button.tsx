"use client"
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: Props) {
  return (
    <button {...props} className={`px-4 py-2 bg-blue-600 text-white rounded ${props.className || ''}`}>
      {props.children}
    </button>
  )
}
