import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { NewsCard } from './NewsCard'

export function FullscreenPostOverlay() {
  const fullscreenPost = useAppStore((s) => s.fullscreenPost)
  const setFullscreenPost = useAppStore((s) => s.setFullscreenPost)

  const close = () => setFullscreenPost(null)

  return (
    <AnimatePresence>
      {fullscreenPost && (
        <>
          {/* Backdrop */}
          <motion.div
            key="fs-backdrop"
            className="fixed inset-0 z-[80] bg-black/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={close}
          />

          {/* Full-screen card — slides up from bottom */}
          <motion.div
            key="fs-card"
            className="fixed inset-0 z-[90] flex items-center justify-center"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
          >
            <div
              className="relative h-full w-full overflow-hidden"
              style={{ maxWidth: '448px' }}
            >
              {/* The actual full-screen NewsCard */}
              <NewsCard post={fullscreenPost} cardIndex={-1} />

              {/* Close button — always visible in top-right corner */}
              <motion.button
                id="btn-close-fullscreen"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 400, damping: 22 }}
                whileTap={{ scale: 0.88 }}
                onClick={close}
                className="absolute right-4 top-safe-area-or-14 z-[100] flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md ring-1 ring-white/20"
                style={{ top: `max(env(safe-area-inset-top, 14px), 14px)` }}
                aria-label="Close"
              >
                <X size={16} className="text-white" strokeWidth={2.5} />
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
