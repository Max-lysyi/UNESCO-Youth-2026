import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, MessageCircle, Send } from 'lucide-react'
import type { Comment, NewsPost } from '../data/posts'
import { cn } from '../lib/utils'

interface CommentsSheetProps {
  isOpen: boolean
  post: NewsPost
  onClose: () => void
}

// ── Individual comment row with its own liked state ───────────────────────────
function CommentRow({ comment, index }: { comment: Comment; index: number }) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(comment.likes)

  const handleLike = () => {
    setLiked((prev) => {
      setCount((c) => (prev ? c - 1 : c + 1))
      return !prev
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.22 }}
      className="flex gap-3"
    >
      <img
        src={comment.avatar}
        alt={comment.username}
        className="h-9 w-9 flex-shrink-0 rounded-full object-cover border"
        style={{ borderColor: 'var(--c-divider)' }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xs font-bold" style={{ color: 'var(--c-text)' }}>@{comment.username}</span>
          <span className="text-[10px]" style={{ color: 'var(--c-text-3)' }}>{comment.timeAgo}</span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{comment.text}</p>
        <div className="mt-2 flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 transition-colors"
          >
            <motion.div animate={liked ? { scale: [1, 1.35, 1] } : { scale: 1 }} transition={{ duration: 0.25 }}>
              <Heart
                size={13}
                strokeWidth={2}
                className={cn(
                  'transition-colors duration-150',
                  liked ? 'fill-[oklch(68%_0.22_25)] text-[oklch(68%_0.22_25)]' : 'text-white/30',
                )}
              />
            </motion.div>
            <span className={cn('text-[11px] font-medium transition-colors', liked ? 'text-[oklch(68%_0.22_25)]' : 'text-white/30')}>
              {count.toLocaleString()}
            </span>
          </button>
          <button className="flex items-center gap-1.5 transition-colors" style={{ color: 'var(--c-text-3)' }}>
            <MessageCircle size={13} />
            <span className="text-[11px] font-medium">Reply</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main sheet ────────────────────────────────────────────────────────────────
export function CommentsSheet({ isOpen, post, onClose }: CommentsSheetProps) {
  // Local comments state — initialized from post, allows appending
  const [comments, setComments] = useState<Comment[]>(post.comments)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Reset when sheet closes or post changes
  useEffect(() => {
    setComments(post.comments)
    setInputValue('')
  }, [post.id, isOpen])

  // Focus input when sheet opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 400)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  const handleSubmit = () => {
    const text = inputValue.trim()
    if (!text) return

    const newComment: Comment = {
      id: `user-${Date.now()}`,
      username: 'you',
      avatar: 'https://i.pravatar.cc/40?img=99',
      text,
      likes: 0,
      timeAgo: 'just now',
    }

    setComments((prev) => [...prev, newComment])
    setInputValue('')

    // Scroll to bottom after render
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="comments-backdrop"
            className="absolute inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="comments-sheet"
            className="absolute bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl overflow-hidden"
            style={{ maxHeight: '78dvh', background: 'var(--c-sheet-bg)', borderTop: '1px solid var(--c-divider)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
          >
            {/* Drag handle */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full pointer-events-none" style={{ background: 'var(--c-surface-3)' }} />

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3.5 pt-6" style={{ borderBottom: '1px solid var(--c-divider)' }}>
              <div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--c-text)' }}>
                  {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--c-text-3)' }}>Join the debate</p>
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full active:opacity-70"
                style={{ background: 'var(--c-surface-2)', color: 'var(--c-text-2)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Comment list */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-5"
            >
              {comments.map((comment, i) => (
                <CommentRow key={comment.id} comment={comment} index={i} />
              ))}
              <div className="h-2" />
            </div>

            {/* Functional input bar */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderTop: '1px solid var(--c-divider)', paddingBottom: 'max(env(safe-area-inset-bottom), 12px)' }}
            >
              {/* User avatar placeholder */}
              <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
                <img src="https://i.pravatar.cc/40?img=99" alt="you" className="h-full w-full object-cover" />
              </div>

              {/* Real text input */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a comment..."
                className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none transition-all"
                style={{
                  background: 'var(--c-input-bg)',
                  border: '1px solid var(--c-input-ring)',
                  color: 'var(--c-text)',
                }}
              />

              {/* Submit button */}
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={handleSubmit}
                className={cn(
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200',
                  inputValue.trim()
                    ? 'bg-[oklch(53%_0.25_240)] text-white shadow-[0_0_12px_oklch(53%_0.25_240/0.5)]'
                    : 'bg-white/10 text-white/30',
                )}
              >
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
