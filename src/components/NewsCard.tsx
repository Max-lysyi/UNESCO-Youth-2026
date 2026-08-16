import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, MessageCircle, Heart } from 'lucide-react'
import type { NewsPost } from '../data/posts'
import { ResultModal } from './ResultModal'
import { CommentsSheet } from './CommentsSheet'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'

interface NewsCardProps {
  post: NewsPost
  cardIndex: number
}

// ── Description text with hashtags + expand/collapse ──────────────────────────
interface DescriptionProps {
  text: string
  tags: string[]
  expanded: boolean
  onToggle: () => void
}

function Description({ text, tags, expanded, onToggle }: DescriptionProps) {
  const isLong = text.length > 90

  return (
    <div className="text-sm leading-relaxed text-white/70">
      <motion.div
        animate={{ height: 'auto' }}
        transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <span className={cn(!expanded && isLong && 'line-clamp-2')}>
          {text}{' '}
          {tags.map((tag) => (
            <span key={tag} className="font-semibold text-[oklch(63%_0.22_240)]">
              #{tag.replace(/\s+/g, '')}
            </span>
          ))}
        </span>
      </motion.div>

      {/* "...more" shown when collapsed and text is long */}
      {!expanded && isLong && (
        <button
          onClick={onToggle}
          className="font-bold text-white/90 hover:text-white"
        >
          {' '}...more
        </button>
      )}

      {/* "Show less" shown when expanded */}
      {expanded && isLong && (
        <button
          onClick={onToggle}
          className="mt-0.5 block font-bold text-white/90 hover:text-white"
        >
          Show less
        </button>
      )}
    </div>
  )
}

// ── Main card ──────────────────────────────────────────────────────────────────
type VerdictChoice = 'fact' | 'fake'

export function NewsCard({ post, cardIndex }: NewsCardProps) {
  // ── Derive answered state from the global store ───────────────────────
  // This prevents re-voting from FullscreenPostOverlay or any other re-render.
  const answeredPostIds = useAppStore((s) => s.answeredPostIds)
  const recordAnswer = useAppStore((s) => s.recordAnswer)
  const answered = answeredPostIds.has(post.id)

  // Local state for WHICH verdict was chosen (persisted via store key)
  // We keep this in local state since it's per-render-instance display only.
  const [userVerdict, setUserVerdict] = useState<VerdictChoice | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [descExpanded, setDescExpanded] = useState(false)

  // Like state — driven by global store so Profile tab can reflect it
  const likedPostIds = useAppStore((s) => s.likedPostIds)
  const toggleLike = useAppStore((s) => s.toggleLike)
  const safeMode = useAppStore((s) => s.safeMode)
  const liked = likedPostIds.has(post.id)
  const [likeCount] = useState(
    post.comments.length > 0
      ? post.comments.reduce((acc, c) => acc + Math.floor(c.likes / post.comments.length), 0)
      : Math.floor(Math.random() * 200) + 10
  )

  const { addScore } = useAppStore()
  const containerRef = useRef<HTMLDivElement>(null)

  const isCorrect =
    userVerdict !== null &&
    ((userVerdict === 'fact' && !post.isFake) || (userVerdict === 'fake' && post.isFake))

  // If the post was answered in a different NewsCard instance (e.g. main feed)
  // but this instance is opened fresh (fullscreen overlay), we show post-answer
  // UI but with no verdict indicator (userVerdict stays null here).
  // This correctly blocks the Fact/Fake buttons via the `answered` flag.

  // ── Auto-close overlays when card scrolls out of view ────────────────────
  const closeAll = useCallback(() => {
    setModalOpen(false)
    setCommentsOpen(false)
  }, [])

  useEffect(() => {
    const card = containerRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) closeAll()
      },
      { threshold: 0.4 }
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [closeAll])

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleVerdict = (verdict: VerdictChoice) => {
    if (answered) return           // already voted globally — hard block
    setUserVerdict(verdict)
    recordAnswer(post.id)          // persist to store — blocks all re-renders
    if ((verdict === 'fact' && !post.isFake) || (verdict === 'fake' && post.isFake)) {
      addScore(10)
    }
    setTimeout(() => setModalOpen(true), 260)
  }

  const handleNext = () => {
    setModalOpen(false)
    setTimeout(() => {
      const feed = document.getElementById('feed-container')
      if (feed) feed.scrollBy({ top: feed.clientHeight, behavior: 'smooth' })
    }, 320)
  }

  const handleLike = () => {
    toggleLike(post.id)
  }

  const factSelected = userVerdict === 'fact'
  const fakeSelected = userVerdict === 'fake'

  return (
    <div
      ref={containerRef}
      className="feed-card relative flex flex-col overflow-hidden bg-black"
      id={`card-${cardIndex}`}
    >
      {/* ── Full-cover background image ──────────────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src={post.image}
          alt={post.headline}
          className="h-full w-full object-cover"
          loading={cardIndex < 2 ? 'eager' : 'lazy'}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.5) 58%, rgba(0,0,0,0.92) 82%, rgba(0,0,0,0.99) 100%)',
          }}
        />
      </div>

      {/* ── Safe Mode Verdict Badge ────────────────────────────────────────── */}
      {safeMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className={cn(
            'absolute top-safe z-20 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold',
            post.isFake
              ? 'bg-[oklch(58%_0.24_25/0.85)] text-white'
              : 'bg-[oklch(52%_0.2_150/0.85)] text-white',
          )}
          style={{ top: 'max(env(safe-area-inset-top, 8px), 8px)', right: '12px', backdropFilter: 'blur(8px)' }}
        >
          {post.isFake ? (
            <X size={11} strokeWidth={3} />
          ) : (
            <Check size={11} strokeWidth={3} />
          )}
          {post.isFake ? 'FAKE' : 'FACT'}
        </motion.div>
      )}

      {/* ── Content overlay ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Push content to bottom */}
        <div className="flex-1" />

        <div className="px-4 pb-5">
          {/* Author — revealed after answering */}
          <AnimatePresence>
            {answered && (
              <motion.div
                key="author"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                className="mb-2.5 flex items-center gap-2"
              >
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="h-6 w-6 rounded-full object-cover ring-1 ring-white/30"
                />
                <span className="text-xs font-semibold text-white/80">{post.authorName}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Headline */}
          <h2 className="mb-2 text-[17px] font-extrabold leading-snug text-white drop-shadow-sm">
            {post.headline}
          </h2>

          {/* Description */}
          <div className="mb-4">
            <Description
              text={post.description}
              tags={post.tags}
              expanded={descExpanded}
              onToggle={() => setDescExpanded((v) => !v)}
            />
          </div>

          {/* ── Action bar — switches between pre and post answer ─────────── */}
          <AnimatePresence mode="wait" initial={false}>

            {/* PRE-ANSWER: two full-width rectangle buttons */}
            {!answered && (
              <motion.div
                key="pre-answer"
                className="flex w-full gap-3"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <motion.button
                  id={`btn-fact-${cardIndex}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVerdict('fact')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[oklch(62%_0.22_150/0.22)] py-3.5 text-sm font-bold text-white ring-1 ring-[oklch(62%_0.22_150/0.55)] active:bg-[oklch(62%_0.22_150/0.4)]"
                >
                  <Check size={16} strokeWidth={2.5} />
                  Fact
                </motion.button>

                <motion.button
                  id={`btn-fake-${cardIndex}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleVerdict('fake')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[oklch(58%_0.24_25/0.22)] py-3.5 text-sm font-bold text-white ring-1 ring-[oklch(58%_0.24_25/0.55)] active:bg-[oklch(58%_0.24_25/0.4)]"
                >
                  <X size={16} strokeWidth={2.5} />
                  Fake
                </motion.button>
              </motion.div>
            )}

            {/* POST-ANSWER: Like (left) | Fact circle + Fake circle (center) | Comments (right) */}
            {answered && (
              <motion.div
                key="post-answer"
                className="flex w-full items-center justify-between"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Like button (left) */}
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={handleLike}
                  className={cn(
                    'flex h-[52px] w-[52px] flex-col items-center justify-center gap-0.5 rounded-full ring-1 transition-colors duration-200',
                    liked
                      ? 'bg-[oklch(55%_0.24_25/0.3)] ring-[oklch(58%_0.24_25/0.6)]'
                      : 'bg-white/12 ring-white/20',
                  )}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 }}
                >
                  <motion.div
                    animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart
                      size={20}
                      strokeWidth={2}
                      className={cn(
                        'transition-colors duration-200',
                        liked ? 'fill-[oklch(68%_0.22_25)] text-[oklch(68%_0.22_25)]' : 'text-white',
                      )}
                    />
                  </motion.div>
                  <span className="text-[10px] font-semibold text-white/70">
                    {likeCount.toLocaleString()}
                  </span>
                </motion.button>

                {/* Fact + Fake circles (center) */}
                <div className="flex items-center gap-2.5">
                  <motion.button
                    id={`btn-fact-answered-${cardIndex}`}
                    className={cn(
                      'flex h-[52px] w-[52px] items-center justify-center rounded-full transition-all',
                      factSelected
                        ? 'bg-gradient-to-br from-[oklch(62%_0.22_150)] to-[oklch(52%_0.2_150)] shadow-[0_0_18px_oklch(62%_0.22_150/0.6)]'
                        : 'bg-[oklch(62%_0.22_150/0.18)] opacity-35 ring-1 ring-[oklch(62%_0.22_150/0.4)]',
                    )}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: factSelected ? 1 : 0.35 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 22, delay: 0.1 }}
                  >
                    <Check size={22} strokeWidth={2.5} className="text-white" />
                  </motion.button>

                  <motion.button
                    id={`btn-fake-answered-${cardIndex}`}
                    className={cn(
                      'flex h-[52px] w-[52px] items-center justify-center rounded-full transition-all',
                      fakeSelected
                        ? 'bg-gradient-to-br from-[oklch(58%_0.24_25)] to-[oklch(48%_0.22_25)] shadow-[0_0_18px_oklch(58%_0.24_25/0.6)]'
                        : 'bg-[oklch(58%_0.24_25/0.18)] opacity-35 ring-1 ring-[oklch(58%_0.24_25/0.4)]',
                    )}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: fakeSelected ? 1 : 0.35 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 22, delay: 0.12 }}
                  >
                    <X size={22} strokeWidth={2.5} className="text-white" />
                  </motion.button>
                </div>

                {/* Comments button (right) */}
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setCommentsOpen(true)}
                  className="flex h-[52px] w-[52px] flex-col items-center justify-center gap-0.5 rounded-full bg-white/12 ring-1 ring-white/20"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.18 }}
                >
                  <MessageCircle size={20} className="text-white" />
                  <span className="text-[10px] font-semibold text-white/70">
                    {post.comments.length}
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Result Modal ─────────────────────────────────────────────────── */}
      <ResultModal
        isOpen={modalOpen}
        isCorrect={isCorrect}
        post={post}
        pointsEarned={10}
        onNext={handleNext}
        onClose={() => setModalOpen(false)}
      />

      {/* ── Comments Sheet ───────────────────────────────────────────────── */}
      <CommentsSheet
        isOpen={commentsOpen}
        post={post}
        onClose={() => setCommentsOpen(false)}
      />
    </div>
  )
}
