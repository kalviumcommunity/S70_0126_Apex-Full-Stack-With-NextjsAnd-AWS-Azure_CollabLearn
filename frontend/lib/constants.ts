// Application Configuration
export const APP_NAME = 'CollabLearn'
export const APP_VERSION = '1.0.0'

// API Configuration
export const API_TIMEOUT = 10000
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Feature Flags
export const FEATURES = {
  SEARCH_ENABLED: true,
  NOTIFICATIONS_ENABLED: true,
  COLLABORATION_ENABLED: true,
} as const
