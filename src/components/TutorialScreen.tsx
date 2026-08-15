import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

const tutorialSteps = [
  {
    emoji: '📰',
    text: 'Read the story on screen.',
    hint: 'Analyze the headline and details carefully',
  },
  {
    emoji: '👆',
    text: "Tap 'Fact' or 'Fake'.",
    hint: 'Trust your critical thinking and intuition',
  },
  {
    emoji: '⭐',
    text: 'Earn points for correct answers. Your score appears at the top!',
    hint: 'The more correct answers — the higher your score',
  },
]

export function TutorialScreen() {
  const [step, setStep] = useState(0)
  const setScreen = useAppStore((s) => s.setScreen)

  const isLast = step === tutorialSteps.length - 1

  const handleNext = () => {
    if (isLast) {
      setScreen('feed')
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[oklch(8%_0.015_240)]">
      {/* Mock post in background */}
      <div className="absolute inset-0 opacity-20 blur-sm">
        <div className="h-full w-full bg-gradient-to-b from-violet-600 via-purple-700 to-indigo-800 flex items-center justify-center">
          <div className="text-9xl">📰</div>
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[oklch(8%_0.015_240/0.85)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-12">
        {/* Progress dots */}
        <div className="flex gap-2 pt-safe">
          {tutorialSteps.map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full"
              animate={{
                width: i === step ? 32 : 8,
                backgroundColor:
                  i === step
                    ? 'oklch(74% 0.18 240)'
                    : i < step
                      ? 'oklch(53% 0.25 240)'
                      : 'oklch(40% 0.04 240)',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Owl + Speech bubble */}
        <div className="flex flex-col items-center gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
              className="flex flex-col items-center gap-5"
            >
              {/* Owl mascot */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="text-8xl drop-shadow-2xl select-none">🦉</div>
                <div className="absolute -bottom-1 -right-1 text-3xl">🕵️</div>
              </motion.div>

              {/* Step emoji badge */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[oklch(100%_0_0/0.1)] backdrop-blur-xl border border-[oklch(100%_0_0/0.15)] text-3xl shadow-lg">
                {tutorialSteps[step].emoji}
              </div>

              {/* Speech bubble */}
              <div className="relative max-w-xs rounded-2xl rounded-tl-sm bg-white px-6 py-4 shadow-2xl">
                <p className="text-center text-base font-semibold leading-snug text-gray-800">
                  {tutorialSteps[step].text}
                </p>
                <p className="mt-1 text-center text-xs text-gray-500">
                  {tutorialSteps[step].hint}
                </p>
                {/* Bubble tail */}
                <div className="absolute -top-2 left-5 h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-white" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step counter & CTA */}
        <div className="flex w-full flex-col items-center gap-3">
          <p className="text-sm text-[oklch(74%_0.04_240)]">
            Step {step + 1} of {tutorialSteps.length}
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleNext}
            className="w-full max-w-xs rounded-2xl bg-[oklch(53%_0.25_240)] px-8 py-4 text-base font-bold text-white shadow-lg active:opacity-90"
          >
            {isLast ? 'Start Playing 🎮' : 'Next →'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
