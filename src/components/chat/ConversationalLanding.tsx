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

export default function ConversationalLanding() {
  const { isAr } = useLang()
  const [state, setState] = useState<ConversationState | null>(null)
  const [resumeFrom, setResumeFrom] = useState<ConversationState | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage after mount
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

  // Initialize fresh state on first hydration (no saved state)
  useEffect(() => {
    if (hydrated && !resumeFrom && !state) {
      const s = initialState()
      setState(s)
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

      {/* Main chat area */}
      <div className="flex-1 flex flex-col items-center pt-14 pb-8 px-4">
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 mb-6 flex flex-col items-center gap-1"
        >
          <p className={`font-mono text-[10px] tracking-widest text-ms-gold-600 uppercase`}>
            MindSync
          </p>
          <h1 className={`text-ms-green-800 font-grotesk font-bold text-xl text-center ${isAr ? 'font-arabic' : ''}`}>
            {isAr ? 'أعمالك، مؤتمتة.' : 'Your Business, Automated.'}
          </h1>
        </motion.div>

        {/* Resume banner */}
        {resumeFrom && (
          <ResumeBanner
            stage={resumeFrom.stage}
            onResume={resume}
            onRestart={startFresh}
          />
        )}

        {/* Chat frame */}
        <div className="w-full max-w-md">
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
                      <Stage4Pricing
                        isAr={isAr}
                        onNext={() => advance(5)}
                      />
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

        {/* Footer */}
        <p className="mt-8 text-center font-mono text-[10px] text-ms-ink-400 tracking-wide">
          © {new Date().getFullYear()} MindSync · Kuwait
        </p>
      </div>
    </div>
  )
}
