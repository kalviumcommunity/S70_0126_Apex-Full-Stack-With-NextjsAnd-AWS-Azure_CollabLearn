import { useState } from 'react'
import type { User } from '../types'

export default function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('user')
      return raw ? (JSON.parse(raw) as User) : null
    }
    return null
  })

  return { user, setUser }
}
