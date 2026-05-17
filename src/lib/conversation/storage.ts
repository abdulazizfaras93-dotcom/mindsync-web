'use client'
import type { ConversationState } from '@/types/conversation'

const KEY = 'ms:conv:v2'
const TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 days

export function loadState(): ConversationState | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConversationState
    if (parsed.version !== 2) return null
    if (Date.now() - parsed.updatedAt > TTL_MS) {
      localStorage.removeItem(KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function saveState(state: ConversationState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...state, updatedAt: Date.now() }))
  } catch { /* storage full or blocked */ }
}

export function clearState(): void {
  try { localStorage.removeItem(KEY) } catch { /* ignore */ }
}

export function initialState(): ConversationState {
  return {
    version: 2,
    stage: 1,
    selectedCategory: null,
    selectedPain: null,
    messages: [],
    liveMessages: [],
    startedAt: Date.now(),
    updatedAt: Date.now(),
  }
}
