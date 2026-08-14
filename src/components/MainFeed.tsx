import { motion } from 'framer-motion'
import { Star, Trophy } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { NEWS_POSTS } from '../data/posts'
import { NewsCard } from './NewsCard'

function ScoreHeader() {
  const score = useAppStore((s) => s.score)

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 pt-safe pb-3"
      style={{
        background: 'linear-gradient(to bottom, oklch(8% 0.015 240 / 0.95) 0%, transparent 100%)',
        paddingTop: 'max(env(safe-area-inset-top), 12px)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-1.5">
        <span className="text-lg">🔍</span>
        <span className="text-sm font-black tracking-tight text-white">
          Fact<span className="text-[oklch(68%_0.22_25)]">Or</span>Fake
        </span>
      </div>

      {/* Score pill */}
      <motion.div
        key={score}
        initial={{ scale: 1.25, y: -4 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className="flex items-center gap-2 rounded-full bg-[oklch(53%_0.25_240/0.25)] px-4 py-1.5 ring-1 ring-[oklch(53%_0.25_240/0.5)] backdrop-blur-md"
      >
        <Star size={13} className="text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-bold text-white">{score}</span>
        <span className="text-xs text-white/50">балів</span>
      </motion.div>
    </motion.div>
  )
}

function EndScreen() {
  const score = useAppStore((s) => s.score)
  const setScreen = useAppStore((s) => s.setScreen)

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
        <h2 className="text-2xl font-black text-white">Ти пройшов усі новини!</h2>
        <p className="text-sm text-white/50">Твій фінальний рахунок:</p>
        <div className="text-5xl font-black text-[oklch(74%_0.18_240)]">{score}</div>
        <p className="text-sm text-white/40">балів з {NEWS_POSTS.length * 10} можливих</p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          setScreen('onboarding')
          const feed = document.getElementById('feed-container')
          if (feed) feed.scrollTo({ top: 0, behavior: 'instant' })
        }}
        className="rounded-2xl bg-[oklch(53%_0.25_240)] px-8 py-4 text-sm font-bold text-white shadow-xl"
      >
        Зіграти знову 🔄
      </motion.button>
    </div>
  )
}

export function MainFeed() {
  return (
    <div className="relative h-dvh w-full">
      <ScoreHeader />

      {/* Scroll-snap feed */}
      <div
        id="feed-container"
        className="feed-container"
      >
        {NEWS_POSTS.map((post, i) => (
          <NewsCard key={post.id} post={post} cardIndex={i} />
        ))}
        <EndScreen />
      </div>
    </div>
  )
}
