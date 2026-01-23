/**
 * Role type definition
 */
export type Role = 'STUDENT' | 'MENTOR'

/**
 * User type definition with comprehensive properties
 */
export type User = {
  id: string
  email: string
  name: string
  role: Role
  avatar?: string
  createdAt?: Date
  specializations?: string[]
  bio?: string
}

/**
 * Course type definition
 */
export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  thumbnail?: string
  rating: number
  students: number
}

/**
 * Authentication response type
 */
export interface AuthResponse {
  token: string
  user: User
}

export type Project = {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  mentorId: string
  mentor?: User
  members?: ProjectMember[]
  tasks?: Task[]
  status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED'
  tags: string[]
}

export type ProjectMember = {
  id: string
  userId: string
  projectId: string
  joinedAt: string
  user?: User
  role: 'OWNER' | 'MEMBER'
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
  projectId: string
  assignedToId?: string
  assignee?: User
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate?: string
}

export type PeerFeedback = {
  id: string
  rating: number
  comment: string
  createdAt: string
  projectId: string
  fromUserId: string
  toUserId: string
  fromUser?: User
  toUser?: User
}

export type EngagementLog = {
  id: string
  actionType: 'LOGIN' | 'TASK_UPDATE' | 'FEEDBACK' | 'PROJECT_JOIN'
  details?: string
  createdAt: string
  userId: string
}
