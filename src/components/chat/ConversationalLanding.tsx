'use client'
import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '@/lib/lang'
import { loadState, saveState, clearState, initialState } from '@/lib/conversation/storage'
import { trackCategorySelected, trackPainSelected, trackStageReached } from '@/lib/conversation/analytics'
import SkipBar from './SkipBar'
import ResumeBanner from './ResumeBanner'
import ChatContainer from './ChatContainer'
import Stage1Greeting from './stages/Stage1Greeting'
import Stage2Pain from './stages/Stage2Pain'
import Stage3Solution from './stages/Stage3Solution'
import Stage4Pricing from './stages/Stage4Pricing'
import Stage5FAQ from './stages/Stage5FAQ'
import type { ConversationState, BusinessCategory, PainKey } from '@/types/conversation'

// Chat header — logo + status bar matching spec Section 6
function ChatHeader({ isAr }: { isAr: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-3 mb-2 ${isAr ? 'flex-row-reverse' : ''}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Logo iris */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-ms-green-800 border border-ms-gold-600/30 overflow-hidden flex items-center justify-center shadow-sm">
          <img src="/logo.png" alt="MindSync" className="w-8 h-8 object-contain" draggable={false} />
        </div>
        {/* Online indicator */}
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
      </div>

      <div className={isAr ? 'text-right' : 'text-left'}>
        <p className="font-grotesk font-bold text-[14px] text-ms-ink-900 leading-tight">MindSync</p>
        <p className={`text-[11px] text-ms-ink-500 flex items-center gap-1 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
          <span className={isAr ? 'font-arabic' : 'font-grotesk'}>
            {isAr ? 'متصل · يرد ٢٤/٧' : 'Online · Replies 24/7'}
          </span>
        </p>
      </div>
    </motion.div>
  )
}

export default function ConversationalLanding() {
  const { isAr } = useLang()
  const [state, setState] = useState<ConversationState | null>(null)
  const [resumeFrom, setResumeFrom] = useState<ConversationState | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadState()
    if (saved && saved.stage > 1) {
      setResumeFrom(saved)
    }
    setHydrated(true)
  }, [])

  const startFresh = useCallback(() => {
    const s = initialState()
    clearState()
    setResumeFrom(null)
    setState(s)
  }, [])

  const resume = useCallback(() => {
    if (resumeFrom) {
      setState(resumeFrom)
      setResumeFrom(null)
    }
  }, [resumeFrom])

  const updateState = useCallback((partial: Partial<ConversationState>) => {
    setState(prev => {
      if (!prev) return prev
      const next = { ...prev, ...partial, updatedAt: Date.now() }
      saveState(next)
      return next
    })
  }, [])

  const advance = useCallback((toStage: ConversationState['stage']) => {
    updateState({ stage: toStage })
    trackStageReached(toStage)
  }, [updateState])

  const handleCategorySelect = useCallback((category: BusinessCategory) => {
    trackCategorySelected(category)
    updateState({ selectedCategory: category, stage: 2 })
    trackStageReached(2)
  }, [updateState])

  const handlePainSelect = useCallback((pain: PainKey) => {
    trackPainSelected(pain)
    updateState({ selectedPain: pain, stage: 3 })
    trackStageReached(3)
  }, [updateState])

  useEffect(() => {
    if (hydrated && !resumeFrom && !state) {
      setState(initialState())
    }
  }, [hydrated, resumeFrom, state])

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-ms-ivory-0 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-ms-green-800 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ms-ivory-0 flex flex-col" dir={isAr ? 'rtl' : 'ltr'}>
      <SkipBar />

      <div className="flex-1 flex flex-col items-center pt-14 pb-8 px-4">
        {/* Spacer */}
        <div className="mt-8 mb-4 w-full max-w-md">
          {resumeFrom ? (
            <ResumeBanner
              stage={resumeFrom.stage}
              onResume={resume}
              onRestart={startFresh}
            />
          ) : null}
        </div>

        {/* Chat frame */}
        <div className="w-full max-w-md">
          {/* Logo header */}
          <ChatHeader isAr={isAr} />

          {/* Subtle divider */}
          <div className="h-px bg-ms-ivory-200 mb-4" />

          <ChatContainer className="min-h-[60vh]">
            {state && (
              <>
                <Stage1Greeting isAr={isAr} onSelect={handleCategorySelect} />

                <AnimatePresence>
                  {state.stage >= 2 && state.selectedCategory && (
                    <motion.div
                      key="stage2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Stage2Pain
                        isAr={isAr}
                        category={state.selectedCategory}
                        onSelect={handlePainSelect}
                      />
                    </motion.div>
                  )}

                  {state.stage >= 3 && state.selectedCategory && state.selectedPain && (
                    <motion.div
                      key="stage3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Stage3Solution
                        isAr={isAr}
                        category={state.selectedCategory}
                        pain={state.selectedPain}
                        onNext={() => advance(4)}
                      />
                    </motion.div>
                  )}

                  {state.stage >= 4 && (
                    <motion.div
                      key="stage4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Stage4Pricing isAr={isAr} onNext={() => advance(5)} />
                    </motion.div>
                  )}

                  {state.stage >= 5 && (
                    <motion.div
                      key="stage5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Stage5FAQ isAr={isAr} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </ChatContainer>
        </div>

        <p className="mt-8 text-center font-mono text-[10px] text-ms-ink-400 tracking-wide">
          © {new Date().getFullYear()} MindSync · الكويت
        </p>
      </div>
    </div>
  )
}