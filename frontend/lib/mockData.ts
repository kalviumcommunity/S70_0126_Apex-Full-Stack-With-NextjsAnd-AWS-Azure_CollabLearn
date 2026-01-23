import { User, Project, Task, PeerFeedback, EngagementLog } from '@/types'

// Mock Users
export const mockUsers: User[] = [
    {
        id: 'u1',
        name: 'John Student',
        email: 'john@student.com',
        role: 'STUDENT',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        bio: 'Aspiring Full Stack Developer'
    },
    {
        id: 'u2',
        name: 'Sarah Mentor',
        email: 'sarah@mentor.com',
        role: 'MENTOR',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        specializations: ['React', 'Node.js', 'System Design'],
        bio: 'Senior Software Engineer with 5 years of experience.'
    },
    {
        id: 'u3',
        name: 'Mike Peer',
        email: 'mike@student.com',
        role: 'STUDENT',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        bio: 'Frontend Enthusiast'
    }
]

export const currentUser = mockUsers[0]

// Mock Projects
export const mockProjects: Project[] = [
    {
        id: 'p1',
        title: 'E-commerce Platform',
        description: 'A full-featured online store with cart, checkout, and payment integration.',
        status: 'ACTIVE',
        mentorId: 'u2',
        createdAt: '2023-10-15T10:00:00Z',
        updatedAt: '2023-10-20T14:30:00Z',
        tags: ['React', 'Next.js', 'Stripe'],
        members: [
            { id: 'pm1', userId: 'u1', projectId: 'p1', joinedAt: '2023-10-16T09:00:00Z', role: 'OWNER' },
            { id: 'pm2', userId: 'u3', projectId: 'p1', joinedAt: '2023-10-16T10:00:00Z', role: 'MEMBER' }
        ]
    },
    {
        id: 'p2',
        title: 'Task Management App',
        description: 'A collaborative task manager similar to Trello or Jira.',
        status: 'COMPLETED',
        mentorId: 'u2',
        createdAt: '2023-09-01T10:00:00Z',
        updatedAt: '2023-09-30T16:00:00Z',
        tags: ['Vue.js', 'Firebase'],
        members: [
            { id: 'pm3', userId: 'u1', projectId: 'p2', joinedAt: '2023-09-02T09:00:00Z', role: 'MEMBER' }
        ]
    },
    {
        id: 'p3',
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media accounts.',
        status: 'ACTIVE',
        mentorId: 'u2',
        createdAt: '2023-11-01T10:00:00Z',
        updatedAt: '2023-11-05T16:00:00Z',
        tags: ['Angular', 'D3.js'],
        members: []
    }
]

// Mock Tasks
export const mockTasks: Task[] = [
    {
        id: 't1',
        title: 'Setup Project Repository',
        description: 'Initialize Git repo and install dependencies.',
        status: 'DONE',
        priority: 'HIGH',
        projectId: 'p1',
        assignedToId: 'u1',
        createdAt: '2023-10-15T11:00:00Z',
        updatedAt: '2023-10-15T12:00:00Z'
    },
    {
        id: 't2',
        title: 'Design Database Schema',
        description: 'Create ERD and define Prisma models.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        projectId: 'p1',
        assignedToId: 'u3',
        createdAt: '2023-10-16T09:00:00Z',
        updatedAt: '2023-10-17T10:00:00Z'
    },
    {
        id: 't3',
        title: 'Implement Authentication',
        description: 'Setup JWT auth with NextAuth.',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: 'p1',
        assignedToId: 'u1',
        createdAt: '2023-10-18T09:00:00Z',
        updatedAt: '2023-10-18T09:00:00Z'
    },
    {
        id: 't4',
        title: 'Create UI Components',
        description: 'Build reusable button, input, and card components.',
        status: 'TODO',
        priority: 'LOW',
        projectId: 'p1',
        createdAt: '2023-10-19T09:00:00Z',
        updatedAt: '2023-10-19T09:00:00Z'
    }
]

// Mock Feedback
export const mockFeedback: PeerFeedback[] = [
    {
        id: 'f1',
        projectId: 'p2',
        fromUserId: 'u2',
        toUserId: 'u1',
        rating: 5,
        comment: 'Excellent work on the frontend structure!',
        createdAt: '2023-09-30T10:00:00Z'
    }
]

// Mock Courses
export const mockCourses = [
    {
        id: 'c1',
        title: 'Web Development Fundamentals',
        description: 'Learn HTML, CSS, and JavaScript basics to build modern websites',
        level: 'Beginner',
        students: 5200,
        rating: 4.8,
        modules: 12,
        duration: '8 weeks',
        instructor: 'Sarah Mentor',
        instructorId: 'u2',
        tags: ['HTML', 'CSS', 'JavaScript'],
        enrolled: false
    },
    {
        id: 'c2',
        title: 'React & Modern JavaScript',
        description: 'Build interactive UIs with React and ES6+ features',
        level: 'Intermediate',
        students: 3800,
        rating: 4.9,
        modules: 10,
        duration: '6 weeks',
        instructor: 'Sarah Mentor',
        instructorId: 'u2',
        tags: ['React', 'JavaScript', 'Hooks'],
        enrolled: false
    },
    {
        id: 'c3',
        title: 'Full Stack Development',
        description: 'Master frontend and backend development with modern tools',
        level: 'Advanced',
        students: 2100,
        rating: 4.7,
        modules: 16,
        duration: '12 weeks',
        instructor: 'Sarah Mentor',
        instructorId: 'u2',
        tags: ['React', 'Node.js', 'Database'],
        enrolled: false
    },
    {
        id: 'c4',
        title: 'TypeScript Mastery',
        description: 'Learn TypeScript from basics to advanced patterns',
        level: 'Intermediate',
        students: 1500,
        rating: 4.6,
        modules: 8,
        duration: '5 weeks',
        instructor: 'Sarah Mentor',
        instructorId: 'u2',
        tags: ['TypeScript', 'JavaScript'],
        enrolled: true
    },
    {
        id: 'c5',
        title: 'Advanced Next.js Patterns',
        description: 'Deep dive into App Router, Server Actions, and Advanced Caching',
        level: 'Advanced',
        students: 1200,
        rating: 4.9,
        modules: 14,
        duration: '8 weeks',
        instructor: 'Sarah Mentor',
        instructorId: 'u2',
        tags: ['Next.js', 'React', 'TypeScript'],
        enrolled: false
    }
]

// Mock Study Groups
export const mockStudyGroups = [
    {
        id: 'sg1',
        name: 'JavaScript Learners',
        description: 'Group for JavaScript learners of all levels',
        members: 342,
        category: 'Programming',
        isJoined: false,
        meetingSchedule: 'Tuesdays & Thursdays, 7 PM',
        topics: ['JavaScript', 'ES6+', 'Async Programming']
    },
    {
        id: 'sg2',
        name: 'Web Development Masters',
        description: 'Advanced web development techniques and best practices',
        members: 567,
        category: 'Web Development',
        isJoined: false,
        meetingSchedule: 'Mondays, 6 PM',
        topics: ['React', 'Performance', 'Architecture']
    },
    {
        id: 'sg3',
        name: 'React Study Circle',
        description: 'Learn and discuss React frameworks and patterns',
        members: 289,
        category: 'Frontend',
        isJoined: true,
        meetingSchedule: 'Wednesdays, 8 PM',
        topics: ['React', 'Next.js', 'State Management']
    },
    {
        id: 'sg4',
        name: 'Open Source Contributors',
        description: 'Contribute to open source and build real-world projects',
        members: 421,
        category: 'Community',
        isJoined: false,
        meetingSchedule: 'Weekends, Flexible',
        topics: ['Git', 'Open Source', 'Collaboration']
    },
    {
        id: 'sg5',
        name: 'Backend Development',
        description: 'Master server-side development and APIs',
        members: 198,
        category: 'Backend',
        isJoined: false,
        meetingSchedule: 'Fridays, 7 PM',
        topics: ['Node.js', 'Databases', 'APIs']
    },
    {
        id: 'sg6',
        name: 'UI/UX Design',
        description: 'Learn design principles and create beautiful interfaces',
        members: 234,
        category: 'Design',
        isJoined: false,
        meetingSchedule: 'Saturdays, 4 PM',
        topics: ['Figma', 'Design Systems', 'Accessibility']
    },
    {
        id: 'sg7',
        name: 'Next.js Enthusiasts',
        description: 'A group for discussing the latest in Next.js ecosystem',
        members: 150,
        category: 'Frontend',
        isJoined: false,
        meetingSchedule: 'Fridays, 5 PM',
        topics: ['Next.js', 'Vercel', 'Edge Functions']
    }
]
