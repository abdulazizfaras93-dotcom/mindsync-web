export type BusinessCategory =
  | 'food' | 'beauty' | 'fashion' | 'retail' | 'cars'
  | 'education' | 'creative' | 'health' | 'sweets' | 'kids'
  | 'home-services' | 'coaching' | 'tech' | 'other'

export type ConversationStage = 1 | 2 | 3 | 4 | 5

export type PainKey = 'time' | 'response' | 'orders' | 'scale'

export type FaqKey = 'setup' | 'languages' | 'channels' | 'training' | 'cancel' | 'trial' | 'data' | 'results'

export interface ChatMessage {
  id: string
  role: 'ai' | 'user'
  content: string
  timestamp: number
}

export interface ConversationState {
  version: 2
  stage: ConversationStage
  selectedCategory: BusinessCategory | null
  selectedPain: PainKey | null
  messages: ChatMessage[]
  liveMessages: LiveMessage[]
  startedAt: number
  updatedAt: number
}

export interface LiveMessage {
  id: string
  role: 'user' | 'ai'
  content: string
}
