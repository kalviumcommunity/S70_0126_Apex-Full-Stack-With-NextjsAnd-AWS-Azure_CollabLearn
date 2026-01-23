/**
 * User type definition with comprehensive properties
 */
export type User = {
  id?: string
  email: string
  name?: string
  avatar?: string
  createdAt?: Date
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
