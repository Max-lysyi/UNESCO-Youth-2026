import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronDown } from 'lucide-react'
import type { NewsPost } from '../data/posts'
import { cn } from '../lib/utils'

interface ResultModalProps {
  isOpen: boolean
  isCorrect: boolean
  post: NewsPost
  pointsEarned: number
  onNext: () => void
}

export function ResultModal({ isOpen, isCorrect, post, pointsEarned, onNext }: ResultModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Modal panel — slides up from bottom */}
          <motion.div
            key="modal"
            className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <div
              className={cn(
                'relative px-6 pb-10 pt-8',
                isCorrect
                  ? 'bg-gradient-to-b from-[oklch(22%_0.08_150)] to-[oklch(14%_0.04_150)]'
                  : 'bg-gradient-to-b from-[oklch(22%_0.08_25)] to-[oklch(14%_0.04_25)]',
              )}
            >
              {/* Decorative glow orb */}
              <div
                className={cn(
                  'absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full blur-3xl opacity-60',
                  isCorrect ? 'bg-[oklch(62%_0.22_150)]' : 'bg-[oklch(58%_0.24_25)]',
                )}
              />

              {/* Handle */}
              <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-white/20" />

              {/* Result icon */}
              <div className="mb-4 flex justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
                >
                  {isCorrect ? (
                    <CheckCircle
                      size={64}
                      className="text-[oklch(72%_0.2_150)]"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <XCircle
                      size={64}
                      className="text-[oklch(68%_0.22_25)]"
                      strokeWidth={1.5}
                    />
                  )}
                </motion.div>
              </div>

              {/* Result text */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col items-center gap-3"
              >
                <h2 className="text-2xl font-black text-white">
                  {isCorrect ? '✅ Правильно!' : '❌ Невірно!'}
                </h2>

                {/* Points earned */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, type: 'spring', stiffness: 300 }}
                  className={cn(
                    'rounded-2xl px-5 py-2 text-sm font-bold',
                    isCorrect
                      ? 'bg-[oklch(62%_0.22_150/0.25)] text-[oklch(72%_0.2_150)] ring-1 ring-[oklch(62%_0.22_150/0.4)]'
                      : 'bg-[oklch(58%_0.24_25/0.2)] text-[oklch(68%_0.22_25)] ring-1 ring-[oklch(58%_0.24_25/0.35)]',
                  )}
                >
                  {isCorrect ? `+${pointsEarned} балів 🎉` : '+0 балів'}
                </motion.div>

                {/* Explanation */}
                <div className="mt-2 rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
                  <p className="text-center text-xs font-medium leading-relaxed text-white/75">
                    {post.explanation}
                  </p>
                </div>

                {/* Actual verdict badge */}
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
                  <span className="text-xs text-white/50">Правильна відповідь:</span>
                  <span
                    className={cn(
                      'text-xs font-bold uppercase tracking-wide',
                      post.verdict === 'fact'
                        ? 'text-[oklch(72%_0.2_150)]'
                        : 'text-[oklch(68%_0.22_25)]',
                    )}
                  >
                    {post.verdict === 'fact' ? '✓ Факт' : '✗ Фейк'}
                  </span>
                </div>
              </motion.div>

              {/* Next button */}
              <motion.button
                id="btn-next-post"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                whileTap={{ scale: 0.97 }}
                onClick={onNext}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/15 py-4 text-sm font-bold text-white ring-1 ring-white/20 active:bg-white/20"
              >
                <ChevronDown size={18} />
                Наступна новина
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
