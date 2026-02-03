'use client';

import { useEffect, useState } from 'react';
import { useAuth, getAuthHeaders } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { FolderKanban, Users, CheckCircle, Plus, LogOut } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    createdAt: string;
}

export default function MentorDashboard() {
    const { user, logout } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchProjects();
        }
    }, [user]);

    const fetchProjects = async () => {
        try {
            const headers = getAuthHeaders(user);
            const res = await fetch('/api/projects', { headers });
            if (res.ok) {
                setProjects(await res.json());
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute allowedRoles={['MENTOR']}>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                {/* Header */}
                <div className="glass border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-white">Mentor Dashboard</h1>
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm">Total Projects</p>
                                        <p className="text-3xl font-bold text-white mt-1">{projects.length}</p>
                                    </div>
                                    <FolderKanban className="w-12 h-12 text-blue-400" />
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm">Active Students</p>
                                        <p className="text-3xl font-bold text-white mt-1">-</p>
                                    </div>
                                    <Users className="w-12 h-12 text-purple-400" />
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-400 text-sm">Tasks Completed</p>
                                        <p className="text-3xl font-bold text-white mt-1">-</p>
                                    </div>
                                    <CheckCircle className="w-12 h-12 text-green-400" />
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Projects Section */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Card>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">My Projects</h2>
                                <Link href="/projects/create">
                                    <Button variant="primary" size="sm">
                                        <Plus className="w-4 h-4" />
                                        New Project
                                    </Button>
                                </Link>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="skeleton h-32 w-full" />
                                    ))}
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="text-center py-12">
                                    <FolderKanban className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                    <p className="text-slate-400 mb-4">No projects yet</p>
                                    <Link href="/projects/create">
                                        <Button variant="primary">
                                            <Plus className="w-4 h-4" />
                                            Create Your First Project
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {projects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <Link href={`/projects/${project.id}`}>
                                                <Card hover className="h-full">
                                                    <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                                                    <p className="text-slate-400 text-sm">
                                                        Created {new Date(project.createdAt).toLocaleDateString()}
                                                    </p>
                                                </Card>
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
