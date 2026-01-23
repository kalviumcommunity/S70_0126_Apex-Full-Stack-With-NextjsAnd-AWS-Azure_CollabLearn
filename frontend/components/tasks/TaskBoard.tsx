'use client'

import { Task, TaskStatus } from '@/types'
import { useState } from 'react'
import { CreateTaskModal } from './CreateTaskModal'

export function TaskBoard({ tasks: initialTasks }: { tasks: Task[] }) {
    // In a real app, this state would come from a parent or global store
    const [tasks, setTasks] = useState(initialTasks)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeCreationStatus, setActiveCreationStatus] = useState<TaskStatus>('TODO')

    const columns: { id: TaskStatus; label: string; color: string }[] = [
        { id: 'TODO', label: 'To Do', color: 'bg-gray-100' },
        { id: 'IN_PROGRESS', label: 'In Progress', color: 'bg-blue-50' },
        { id: 'DONE', label: 'Done', color: 'bg-green-50' }
    ]

    const getTasksByStatus = (status: TaskStatus) => {
        return tasks.filter(task => task.status === status)
    }

    // Placeholder draggable logic
    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        e.dataTransfer.setData('taskId', taskId)
    }

    const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
        const taskId = e.dataTransfer.getData('taskId')
        setTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, status } : t
        ))
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const openCreateModal = (status: TaskStatus) => {
        setActiveCreationStatus(status)
        setIsModalOpen(true)
    }

    const handleCreateTask = (taskData: { title: string; description: string; priority: 'LOW' | 'MEDIUM' | 'HIGH'; status: TaskStatus }) => {
        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            ...taskData,
            projectId: tasks.length > 0 ? tasks[0].projectId : 'p1', // Best guess for mock
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        setTasks([...tasks, newTask])
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
                {columns.map(col => (
                    <div
                        key={col.id}
                        className={`rounded-xl p-4 ${col.color} border border-opacity-50 border-gray-200 flex flex-col`}
                        onDrop={(e) => handleDrop(e, col.id)}
                        onDragOver={handleDragOver}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-700">{col.label}</h3>
                            <span className="bg-white px-2 py-0.5 rounded text-sm text-gray-500 shadow-sm">
                                {getTasksByStatus(col.id).length}
                            </span>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3">
                            {getTasksByStatus(col.id).map(task => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id)}
                                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-move hover:shadow-md transition-all active:scale-95"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${task.priority === 'HIGH' ? 'bg-red-100 text-red-600' :
                                            task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {task.priority}
                                        </span>
                                        {task.assignedToId && (
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-bold">
                                                {/* Placeholder for Avatar */}
                                                U
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
                                    {task.description && (
                                        <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => openCreateModal(col.id)}
                            className="mt-3 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition text-sm font-medium"
                        >
                            + Add Task
                        </button>
                    </div>
                ))}
            </div>

            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateTask}
                defaultStatus={activeCreationStatus}
            />
        </>
    )
}
