import { Project } from '@/types'
import Link from 'next/link'
import { Card } from '@/components/ui/card' // Assuming UI components exist or using simple div
import { Badge } from '@/components/ui/badge' // Placeholder

export function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        <Link href={`/projects/${project.id}`} className="hover:text-blue-600 transition">
                            {project.title}
                        </Link>
                    </h3>
                    <p className="text-gray-600 line-clamp-2">{project.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        project.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {project.status}
                </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-gray-500 border-t pt-4">
                <div className="flex items-center gap-2">
                    <span>👥 {project.members?.length || 0} members</span>
                    <span>•</span>
                    <span>📅 {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
                <Link
                    href={`/projects/${project.id}`}
                    className="text-blue-600 font-medium hover:text-blue-700"
                >
                    View Details →
                </Link>
            </div>
        </div>
    )
}
