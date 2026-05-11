import { createSeed } from '../data/seed'

export const STORAGE = 'sms-campus-v3'
export const SESSION = 'sms-futuristic-session'

export function loadDb() {
  try {
    const raw = localStorage.getItem(STORAGE)
    if (!raw) {
      const initial = createSeed()
      localStorage.setItem(STORAGE, JSON.stringify(initial))
      return initial
    }
    const parsed = JSON.parse(raw)
    if (!parsed.schemaVersion || parsed.schemaVersion < 3) {
      const fresh = createSeed()
      localStorage.setItem(STORAGE, JSON.stringify(fresh))
      return fresh
    }
    return parsed
  } catch (e) {
    console.error('Failed to load DB from localStorage, resetting...', e)
    const initial = createSeed()
    localStorage.setItem(STORAGE, JSON.stringify(initial))
    return initial
  }
}

export function persistDb(db) {
  localStorage.setItem(STORAGE, JSON.stringify(db))
}
