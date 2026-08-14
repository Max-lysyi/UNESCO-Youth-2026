import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Zap, Tag } from 'lucide-react'
import type { NewsPost, Verdict } from '../data/posts'
import { ResultModal } from './ResultModal'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'

interface NewsCardProps {
  post: NewsPost
  cardIndex: number
}

type CardState = 'idle' | 'answered'

export function NewsCard({ post, cardIndex }: NewsCardProps) {
  const [cardState, setCardState] = useState<CardState>('idle')
  const [userVerdict, setUserVerdict] = useState<Verdict | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const { addScore, nextCard } = useAppStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const isCorrect = userVerdict !== null && userVerdict === post.verdict

  const handleVerdict = (verdict: Verdict) => {
    if (cardState === 'answered') return
    setUserVerdict(verdict)
    setCardState('answered')
    if (verdict === post.verdict) {
      addScore(10)
    }
    // Small delay before showing modal for tactile feel
    setTimeout(() => setModalOpen(true), 200)
  }

  const handleNext = () => {
    setModalOpen(false)
    // Scroll to next card after modal closes
    setTimeout(() => {
      nextCard()
      const feed = document.getElementById('feed-container')
      if (feed) {
        feed.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <div
      ref={containerRef}
      className="feed-card relative flex flex-col overflow-hidden"
      id={`card-${cardIndex}`}
    >
      {/* Background image area */}
      <div className={cn('relative flex-1 bg-gradient-to-b', post.imageGradient)}>
        {/* Decorative pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, oklch(100% 0 0 / 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, oklch(0% 0 0 / 0.2) 0%, transparent 50%)`,
          }}
        />

        {/* Main emoji */}
        <div className="flex h-full items-center justify-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.8, 0.25, 1] }}
            className="text-[120px] drop-shadow-2xl leading-none select-none"
          >
            {post.imageEmoji}
          </motion.div>
        </div>

        {/* Source badge */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-14 left-4 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/15"
        >
          <Zap size={11} className="text-yellow-400" />
          <span className="text-xs font-semibold text-white/90">{post.source}</span>
        </motion.div>

        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="absolute top-14 right-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/20"
        >
          <Tag size={11} className="text-white/80" />
          <span className="text-xs font-medium text-white/80">{post.category}</span>
        </motion.div>

        {/* Gradient fade to content below */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[oklch(8%_0.015_240)] to-transparent" />
      </div>

      {/* Text content area */}
      <div className="relative bg-[oklch(8%_0.015_240)] px-5 pb-5 pt-0">
        {/* Pull quote accent */}
        <div className="h-0.5 w-10 rounded-full bg-gradient-to-r from-[oklch(53%_0.25_240)] to-transparent mb-4" />

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2 text-lg font-extrabold leading-tight text-white"
        >
          {post.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs leading-relaxed text-white/60"
        >
          {post.description}
        </motion.p>

        {/* Answer buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex gap-3"
        >
          <VerdictButton
            id={`btn-fact-${cardIndex}`}
            label="Вірю"
            emoji="✅"
            type="fact"
            disabled={cardState === 'answered'}
            selected={userVerdict === 'fact'}
            isCorrect={isCorrect}
            answered={cardState === 'answered'}
            onClick={() => handleVerdict('fact')}
            accentClass="bg-gradient-to-br from-[oklch(62%_0.22_150)] to-[oklch(52%_0.2_150)] shadow-[0_0_20px_oklch(62%_0.22_150/0.5)]"
            idleClass="bg-[oklch(62%_0.22_150/0.18)] ring-1 ring-[oklch(62%_0.22_150/0.4)] text-[oklch(72%_0.2_150)]"
          />
          <VerdictButton
            id={`btn-fake-${cardIndex}`}
            label="Не вірю"
            emoji="🚫"
            type="fake"
            disabled={cardState === 'answered'}
            selected={userVerdict === 'fake'}
            isCorrect={isCorrect}
            answered={cardState === 'answered'}
            onClick={() => handleVerdict('fake')}
            accentClass="bg-gradient-to-br from-[oklch(58%_0.24_25)] to-[oklch(48%_0.22_25)] shadow-[0_0_20px_oklch(58%_0.24_25/0.5)]"
            idleClass="bg-[oklch(58%_0.24_25/0.18)] ring-1 ring-[oklch(58%_0.24_25/0.4)] text-[oklch(68%_0.22_25)]"
          />
        </motion.div>
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={modalOpen}
        isCorrect={isCorrect}
        post={post}
        pointsEarned={10}
        onNext={handleNext}
      />
    </div>
  )
}

interface VerdictButtonProps {
  id: string
  label: string
  emoji: string
  type: Verdict
  disabled: boolean
  selected: boolean
  isCorrect: boolean
  answered: boolean
  onClick: () => void
  accentClass: string
  idleClass: string
}

function VerdictButton({
  id,
  label,
  emoji,
  type,
  disabled,
  selected,
  answered,
  onClick,
  accentClass,
  idleClass,
}: VerdictButtonProps) {
  const isSelected = selected
  const dimmed = answered && !isSelected

  return (
    <motion.button
      id={id}
      whileTap={!disabled ? { scale: 0.93 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold transition-all duration-200',
        isSelected ? accentClass + ' text-white' : idleClass,
        dimmed && 'opacity-30',
      )}
    >
      <span className="text-lg leading-none">{emoji}</span>
      <span>{label}</span>
    </motion.button>
  )
}
