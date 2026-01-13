import { useState, useEffect } from 'react'
import type { User } from '../types'

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // placeholder: load user from localStorage
    const raw = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    if (raw) setUser(JSON.parse(raw))
  }, [])

  return { user, setUser }
}
