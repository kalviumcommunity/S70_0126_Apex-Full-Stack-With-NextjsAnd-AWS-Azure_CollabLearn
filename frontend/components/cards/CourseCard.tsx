import React from 'react'

type CourseCardProps = {
  title?: string
  description?: string
}

export default function CourseCard({ title = 'Course title', description = 'Short description' }: CourseCardProps) {
  return (
    <article className="border rounded p-4">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </article>
  )
}
