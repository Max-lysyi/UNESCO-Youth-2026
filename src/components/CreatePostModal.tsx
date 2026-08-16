import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ImageIcon, CheckCircle, XCircle, Plus, Loader } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { NewsPost } from '../data/posts'
import { cn } from '../lib/utils'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

// Random picsum seed on each modal open
function getRandomImageUrl() {
  const seed = Math.random().toString(36).slice(2, 8)
  return `https://picsum.photos/seed/${seed}/800/1200`
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const addPost = useAppStore((s) => s.addPost)

  const [headline, setHeadline] = useState('')
  const [description, setDescription] = useState('')
  const [explanation, setExplanation] = useState('')
  const [imageUrl, setImageUrl] = useState(() => getRandomImageUrl())
  const [isFake, setIsFake] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const canSubmit =
    headline.trim().length >= 2 &&
    description.trim().length >= 2 &&
    explanation.trim().length >= 2

  const handleClose = () => {
    onClose()
    // Reset form after animation
    setTimeout(() => {
      setHeadline('')
      setDescription('')
      setExplanation('')
      setImageUrl(getRandomImageUrl())
      setIsFake(false)
      setSubmitted(false)
      setSubmitting(false)
    }, 400)
  }

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return
    setSubmitting(true)

    // Simulate a brief async "posting" delay for UX polish
    await new Promise((r) => setTimeout(r, 700))

    const newPost: NewsPost = {
      id: `user-${Date.now()}`,
      image: imageUrl,
      authorName: 'fact_hunter',
      authorAvatar: 'https://i.pravatar.cc/80?img=99',
      tags: ['Community', 'UserPost'],
      headline: headline.trim(),
      description: description.trim(),
      isFake,
      explanation: explanation.trim(),
      comments: [],
    }

    addPost(newPost)
    setSubmitted(true)

    // Auto-close after success
    setTimeout(() => handleClose(), 1600)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — absolute inside relative container */}
          <motion.div
            key="create-backdrop"
            className="absolute inset-0 z-40 bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          />

          {/* Sheet — absolute bottom-0 inside relative container */}
          <motion.div
            key="create-sheet"
            className="absolute bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl overflow-hidden shadow-2xl"
            style={{
              maxHeight: '92%',
              background: 'var(--c-sheet-bg)',
              borderTop: '1px solid var(--c-divider)',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            {/* Drag handle */}
            <div
              className="absolute top-2.5 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full pointer-events-none"
              style={{ background: 'var(--c-surface-3)' }}
            />

            {/* ── Success state ──────────────────────────────────────────── */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-t-3xl"
                  style={{ background: 'var(--c-sheet-bg)' }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <CheckCircle size={72} className="text-[oklch(72%_0.2_150)]" strokeWidth={1.5} />
                  </motion.div>
                  <p className="text-xl font-black" style={{ color: 'var(--c-text)' }}>
                    Post Published! 🎉
                  </p>
                  <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>
                    It is now live in the Feed
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Header ────────────────────────────────────────────────── */}
            <div
              className="flex-shrink-0 flex items-center justify-between px-5 pb-4 pt-6"
              style={{ borderBottom: '1px solid var(--c-divider)' }}
            >
              <div>
                <h2 className="text-base font-black" style={{ color: 'var(--c-text)' }}>
                  Create Post
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--c-text-3)' }}>
                  Share a story for others to judge
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: 'var(--c-surface-2)', color: 'var(--c-text-2)' }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* ── Form Body ─────────────────────────────────────────────── */}
            <div
              className="flex-1 overflow-y-auto px-5 py-5 no-scrollbar space-y-4"
              style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 20px)' }}
            >
              {/* Image preview + URL */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text-2)' }}>
                  Cover Image
                </label>
                <div className="relative mb-2 h-36 w-full overflow-hidden rounded-2xl bg-black">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="h-full w-full object-cover opacity-75"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon size={28} className="text-white/30" />
                  </div>
                </div>
                <input
                  id="create-image-url"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://picsum.photos/seed/abc/800/1200"
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                  style={{
                    background: 'var(--c-input-bg)',
                    border: '1px solid var(--c-input-ring)',
                    color: 'var(--c-text)',
                  }}
                />
              </div>

              {/* Headline */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text-2)' }}>
                  Headline <span className="text-[oklch(68%_0.22_25)]">*</span>
                </label>
                <input
                  id="create-headline"
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Write a compelling, concise headline…"
                  maxLength={140}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    background: 'var(--c-input-bg)',
                    border: '1px solid var(--c-input-ring)',
                    color: 'var(--c-text)',
                  }}
                />
                <p className="mt-1 text-right text-[10px]" style={{ color: 'var(--c-text-3)' }}>
                  {headline.length}/140
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text-2)' }}>
                  Description <span className="text-[oklch(68%_0.22_25)]">*</span>
                </label>
                <textarea
                  id="create-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide context, details, and supporting information…"
                  maxLength={600}
                  rows={3}
                  className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all leading-relaxed"
                  style={{
                    background: 'var(--c-input-bg)',
                    border: '1px solid var(--c-input-ring)',
                    color: 'var(--c-text)',
                  }}
                />
                <p className="mt-1 text-right text-[10px]" style={{ color: 'var(--c-text-3)' }}>
                  {description.length}/600
                </p>
              </div>

              {/* Fact / Fake Toggle */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text-2)' }}>
                  Is this…? <span className="text-[oklch(68%_0.22_25)]">*</span>
                </label>
                <div className="flex gap-3">
                  <button
                    id="create-toggle-fact"
                    onClick={() => setIsFake(false)}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold transition-all',
                      !isFake
                        ? 'bg-[oklch(52%_0.2_150/0.2)] text-[oklch(52%_0.2_150)] ring-1 ring-[oklch(52%_0.2_150/0.7)] shadow-[0_0_14px_oklch(52%_0.2_150/0.2)]'
                        : 'bg-[var(--c-surface-2)] text-[var(--c-text-3)] ring-1 ring-[var(--c-divider)]',
                    )}
                  >
                    <CheckCircle size={16} strokeWidth={2} />
                    Fact
                  </button>
                  <button
                    id="create-toggle-fake"
                    onClick={() => setIsFake(true)}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold transition-all',
                      isFake
                        ? 'bg-[oklch(58%_0.24_25/0.2)] text-[oklch(58%_0.24_25)] ring-1 ring-[oklch(58%_0.24_25/0.7)] shadow-[0_0_14px_oklch(58%_0.24_25/0.2)]'
                        : 'bg-[var(--c-surface-2)] text-[var(--c-text-3)] ring-1 ring-[var(--c-divider)]',
                    )}
                  >
                    <XCircle size={16} strokeWidth={2} />
                    Fake
                  </button>
                </div>
              </div>

              {/* Explanation (Пояснення) */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--c-text-2)' }}>
                  Explanation <span className="text-[oklch(68%_0.22_25)]">*</span>
                </label>
                <p className="mb-2 text-[11px] leading-relaxed" style={{ color: 'var(--c-text-3)' }}>
                  Why is this a {isFake ? 'Fake' : 'Fact'}? Voters will see this after they answer.
                  (e.g. &ldquo;This image was AI-generated — look at the extra fingers&rdquo;)
                </p>
                <textarea
                  id="create-explanation"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder={
                    isFake
                      ? 'Explain why this is fake, how to spot it, what the red flags are…'
                      : 'Explain why this is fact, what sources confirm it, key evidence…'
                  }
                  maxLength={400}
                  rows={3}
                  className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all leading-relaxed"
                  style={{
                    background: 'var(--c-input-bg)',
                    border: `1px solid ${isFake ? 'oklch(58% 0.24 25 / 0.4)' : 'oklch(52% 0.2 150 / 0.4)'}`,
                    color: 'var(--c-text)',
                  }}
                />
                <p className="mt-1 text-right text-[10px]" style={{ color: 'var(--c-text-3)' }}>
                  {explanation.length}/400
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                id="btn-submit-post"
                whileTap={{ scale: canSubmit ? 0.97 : 1 }}
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className={cn(
                  'mt-2 flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 text-sm font-bold transition-all',
                  canSubmit && !submitting
                    ? 'text-white shadow-xl cursor-pointer'
                    : 'bg-[var(--c-surface-3)] text-[var(--c-text-3)] cursor-not-allowed',
                )}
                style={
                  canSubmit && !submitting
                    ? {
                        background:
                          'linear-gradient(135deg, oklch(53% 0.25 240), oklch(48% 0.28 270))',
                        boxShadow: '0 0 24px oklch(53% 0.25 240 / 0.45)',
                      }
                    : {}
                }
              >
                {submitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    >
                      <Loader size={16} />
                    </motion.div>
                    Publishing…
                  </>
                ) : (
                  <>
                    <Plus size={16} strokeWidth={2.5} />
                    Publish to Feed
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
