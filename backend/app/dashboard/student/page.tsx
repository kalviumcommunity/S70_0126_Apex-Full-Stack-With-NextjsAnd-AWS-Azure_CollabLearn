'use client';

import { useEffect, useState } from 'react';
import { useAuth, getAuthHeaders } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, TrendingUp, LogOut } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface Task {
    id: string;
    title: string;
    status: string;
    projectId: string;
}

interface Project {
    id: string;
    title: string;
}

export default function StudentDashboard() {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const headers = getAuthHeaders(user);

            const [tasksRes, projectsRes] = await Promise.all([
                fetch('/api/tasks', { headers }),
                fetch('/api/projects', { headers })
            ]);

            if (tasksRes.ok) setTasks(await tasksRes.json());
            if (projectsRes.ok) setProjects(await projectsRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const stats = {
        totalTasks: tasks.length,
        completed: tasks.filter(t => t.status === 'DONE').length,
        inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
        projects: projects.length,
    };

    return (
        <ProtectedRoute allowedRoles={['STUDENT']}>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Header */}
                <div className="glass border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-slate-300">Welcome, {user?.name}</span>
                                <Button variant="ghost" size="sm" onClick={logout}>
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm">Total Tasks</p>
                                        <p className="text-3xl font-bold text-white mt-1">{stats.totalTasks}</p>
                                    </div>
                                    <BookOpen className="w-12 h-12 text-blue-400" />
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm">Completed</p>
                                        <p className="text-3xl font-bold text-white mt-1">{stats.completed}</p>
                                    </div>
                                    <CheckCircle className="w-12 h-12 text-green-400" />
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm">In Progress</p>
                                        <p className="text-3xl font-bold text-white mt-1">{stats.inProgress}</p>
                                    </div>
                                    <Clock className="w-12 h-12 text-orange-400" />
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm">Projects</p>
                                        <p className="text-3xl font-bold text-white mt-1">{stats.projects}</p>
                                    </div>
                                    <TrendingUp className="w-12 h-12 text-purple-400" />
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Tasks Section */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">My Tasks</h2>
                                <Link href="/tasks">
                                    <Button variant="ghost" size="sm">View All</Button>
                                </Link>
                            </div>

                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="skeleton h-16 w-full" />
                                    ))}
                                </div>
                            ) : tasks.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-slate-400">No tasks assigned yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {tasks.slice(0, 5).map((task, index) => (
                                        <motion.div
                                            key={task.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <Link href={`/tasks/${task.id}`}>
                                                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-all cursor-pointer">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="text-white font-medium">{task.title}</h3>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.status === 'DONE' ? 'bg-green-500/20 text-green-400' :
                                                                task.status === 'IN_PROGRESS' ? 'bg-orange-500/20 text-orange-400' :
                                                                    'bg-slate-500/20 text-slate-400'
                                                            }`}>
                                                            {task.status.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
