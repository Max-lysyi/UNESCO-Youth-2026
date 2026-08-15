import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, TrendingUp, X, Check } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { NewsPost } from '../data/posts'
import { cn } from '../lib/utils'

function SearchPostCard({ post, index, safeMode }: { post: NewsPost; index: number; safeMode: boolean }) {
  const setFullscreenPost = useAppStore((s) => s.setFullscreenPost)

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      onClick={() => setFullscreenPost(post)}
      className="relative aspect-[9/14] w-full overflow-hidden rounded-2xl bg-black text-left active:scale-95 transition-transform duration-150"
    >
      <img
        src={post.image}
        alt={post.headline}
        className="h-full w-full object-cover opacity-80"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)' }}
      />

      {/* Safe Mode Verdict badge — only when safeMode is ON */}
      {safeMode && (
        <div
          className={cn(
            'absolute top-2.5 right-2.5 flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase',
            post.isFake
              ? 'bg-[oklch(58%_0.24_25/0.85)] text-white'
              : 'bg-[oklch(52%_0.2_150/0.85)] text-white',
          )}
        >
          {post.isFake ? <X size={9} strokeWidth={3} /> : <Check size={9} strokeWidth={3} />}
          {post.isFake ? 'Fake' : 'Fact'}
        </div>
      )}

      {/* Headline + tags */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="line-clamp-3 text-[11px] font-semibold leading-tight text-white">
          {post.headline}
        </p>
        <div className="mt-1 flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-white/15 px-1.5 py-px text-[9px] text-white/70">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  )
}

export function SearchTab() {
  const posts = useAppStore((s) => s.posts)
  const safeMode = useAppStore((s) => s.safeMode)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return posts
    const q = query.toLowerCase()
    return posts.filter(
      (p) =>
        p.headline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.authorName.toLowerCase().includes(q),
    )
  }, [posts, query])

  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--c-bg)' }}>
      {/* Search header — offset below AppHeader (~90px) */}
      <div
        className="flex-shrink-0 px-4 pb-3"
        style={{ paddingTop: 'max(calc(env(safe-area-inset-top) + 88px), 96px)' }}
      >
        <div className="relative">
          <Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--c-text-3)' }}
          />
          <input
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, topics, sources…"
            className="w-full rounded-2xl py-3 pl-10 pr-10 text-sm placeholder-[var(--c-text-3)] outline-none transition-all"
            style={{
              background: 'var(--c-input-bg)',
              border: '1px solid var(--c-divider)',
              color: 'var(--c-text)',
            }}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full"
                style={{ background: 'var(--c-surface-3)', color: 'var(--c-text-2)' }}
              >
                <X size={11} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Section label */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 pb-3">
        {query ? (
          <p className="text-xs font-semibold" style={{ color: 'var(--c-text-3)' }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>
        ) : (
          <>
            <TrendingUp size={13} className="text-[oklch(53%_0.25_240)]" />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-text-3)' }}>
              Trending Now
            </p>
          </>
        )}
      </div>

      {/* Scrollable grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-6 no-scrollbar" style={{ touchAction: 'pan-y' }}>
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {filtered.map((post, i) => (
                <SearchPostCard key={post.id} post={post} index={i} safeMode={safeMode} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-3 py-20 text-center"
            >
              <span className="text-4xl">🔍</span>
              <p className="text-sm font-semibold" style={{ color: 'var(--c-text-3)' }}>
                No stories found
              </p>
              <p className="text-xs" style={{ color: 'var(--c-text-3)' }}>
                Try a different keyword or topic
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
