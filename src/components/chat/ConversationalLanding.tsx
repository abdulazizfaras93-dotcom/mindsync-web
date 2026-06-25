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

function ChatHeader({ isAr }: { isAr: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-3 mb-2 ${isAr ? 'flex-row-reverse' : ''}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-ms-green-800 border border-ms-gold-600/30 overflow-hidden flex items-center justify-center">
          <img src="/logo.png" alt="MindSync" className="w-8 h-8 object-contain" draggable={false} />
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#060E09]" />
      </div>
      <div className={isAr ? 'text-right' : 'text-left'}>
        <p className="font-grotesk font-bold text-[14px] text-white leading-tight">MindSync</p>
        <p className={`text-[11px] text-white/50 flex items-center gap-1 ${isAr ? 'flex-row-reverse justify-end' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span className={isAr ? 'font-arabic' : 'font-grotesk'}>
            {isAr ? 'متصل · يرد ٢٤/٧' : 'Online · Replies 24/7'}
          </span>
        </p>
      </div>
    </motion.div>
  )
}

function ProgressDots({ stage }: { stage: number }) {
  return (
    <div className="flex items-center justify-center gap-2 py-3" dir="ltr">
      {[1, 2, 3, 4, 5].map(s => (
        <motion.div
          key={s}
          animate={{
            width: s === stage ? 20 : 6,
            opacity: s < stage ? 0.4 : s === stage ? 1 : 0.2,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 6,
            borderRadius: 99,
            background: s <= stage ? '#BF8D38' : 'rgba(255,255,255,0.4)',
          }}
        />
      ))}
    </div>
  )
}

export default function ConversationalLanding({ embedded = false }: { embedded?: boolean }) {
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
      <div className={`${embedded ? 'min-h-[60vh]' : 'min-h-screen'} flex items-center justify-center`} style={{ background: '#060E09' }}>
        <div className="w-5 h-5 rounded-full border-2 border-ms-gold-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div
      className={`${embedded ? '' : 'min-h-screen'} flex flex-col`}
      dir={isAr ? 'rtl' : 'ltr'}
      style={{
        background: '#060E09',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {!embedded && <SkipBar />}

      <div className={`flex-1 flex flex-col items-center ${embedded ? 'pt-12' : 'pt-20'} pb-12 px-4`}>
        {resumeFrom && (
          <div className="mb-4 w-full max-w-md">
            <ResumeBanner
              stage={resumeFrom.stage}
              onResume={resume}
              onRestart={startFresh}
            />
          </div>
        )}

        <div className="w-full max-w-md">
          <ChatHeader isAr={isAr} />

          <div className="h-px bg-white/[0.07] mb-1" />

          {state && <ProgressDots stage={state.stage} />}

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

        {!embedded && (
          <p className="mt-10 text-center font-mono text-[10px] text-white/20 tracking-wide">
            © {new Date().getFullYear()} MindSync · الكويت
          </p>
        )}
      </div>
    </div>
  )
}