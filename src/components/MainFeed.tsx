import { useAppStore } from '../store/useAppStore'
import { Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { NewsCard } from './NewsCard'

function EndScreen() {
  const score = useAppStore((s) => s.score)
  const posts = useAppStore((s) => s.posts)
  const { setScreen, resetGame } = useAppStore()
  const maxScore = posts.length * 10

  const handleReplay = () => {
    resetGame()
    setScreen('onboarding')
    const feed = document.getElementById('feed-container')
    if (feed) feed.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="feed-card flex flex-col items-center justify-center gap-6 bg-[oklch(8%_0.015_240)] px-8">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Trophy size={72} className="text-yellow-400" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <h2 className="text-2xl font-black text-white">You've read all stories!</h2>
        <p className="text-sm text-white/50">Your final score:</p>
        <div className="text-5xl font-black text-[oklch(74%_0.18_240)]">{score}</div>
        <p className="text-sm text-white/40">pts out of {maxScore} possible</p>

        {/* Accuracy bar */}
        <div className="mt-2 w-full max-w-[200px]">
          <div className="h-2 w-full rounded-full bg-white/10">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-[oklch(53%_0.25_240)] to-[oklch(63%_0.22_240)]"
              initial={{ width: 0 }}
              animate={{ width: `${(score / maxScore) * 100}%` }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="mt-1 text-center text-xs text-white/30">
            {Math.round((score / maxScore) * 100)}% accuracy
          </p>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleReplay}
        className="rounded-2xl bg-[oklch(53%_0.25_240)] px-8 py-4 text-sm font-bold text-white shadow-xl"
        style={{ boxShadow: '0 0 24px oklch(53% 0.25 240 / 0.4)' }}
      >
        Play Again 🔄
      </motion.button>
    </div>
  )
}

export function MainFeed() {
  const posts = useAppStore((s) => s.posts)

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-[oklch(5%_0.01_240)]">
      <div
        className="relative h-dvh w-full overflow-hidden"
        style={{ maxWidth: '430px' }}
      >
        {/* Scroll-snap feed — AppHeader is rendered above this by SwipeContainer */}
        <div id="feed-container" className="feed-container h-full">
          {posts.map((post, i) => (
            <NewsCard key={post.id} post={post} cardIndex={i} />
          ))}
          <EndScreen />
        </div>
      </div>
    </div>
  )
}
