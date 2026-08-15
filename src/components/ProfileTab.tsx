import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Heart, Users, Star, ImageIcon, PenSquare, Check, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { NewsPost } from '../data/posts'
import { CreatePostModal } from './CreatePostModal'
import { cn } from '../lib/utils'

type SubTab = 'created' | 'liked'

// ── Shared grid thumbnail card ─────────────────────────────────────────────────
function GridPostCard({
  post,
  index,
  badge,
  safeMode,
}: {
  post: NewsPost
  index: number
  badge?: React.ReactNode
  safeMode: boolean
}) {
  const setFullscreenPost = useAppStore((s) => s.setFullscreenPost)

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => setFullscreenPost(post)}
      className="relative aspect-[9/14] w-full overflow-hidden rounded-2xl bg-black text-left active:scale-95 transition-transform duration-150"
    >
      <img src={post.image} alt={post.headline} className="h-full w-full object-cover opacity-85" loading="lazy" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 100%)' }}
      />

      {/* Safe Mode verdict badge */}
      {safeMode && (
        <div
          className={cn(
            'absolute top-2.5 right-2.5 flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase',
            post.isFake ? 'bg-[oklch(58%_0.24_25/0.85)] text-white' : 'bg-[oklch(52%_0.2_150/0.85)] text-white',
          )}
        >
          {post.isFake ? <X size={9} strokeWidth={3} /> : <Check size={9} strokeWidth={3} />}
          {post.isFake ? 'Fake' : 'Fact'}
        </div>
      )}

      {/* Tab badge (heart / pen) — only when safeMode is off */}
      {!safeMode && badge && <div className="absolute top-2.5 right-2.5">{badge}</div>}

      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="line-clamp-3 text-[11px] font-semibold leading-tight text-white">{post.headline}</p>
      </div>
    </motion.button>
  )
}

function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-base font-black" style={{ color: 'var(--c-text)' }}>
          {value}
        </span>
      </div>
      <span className="text-[10px]" style={{ color: 'var(--c-text-3)' }}>
        {label}
      </span>
    </div>
  )
}

function EmptyState({ subTab }: { subTab: SubTab }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-3 py-16 text-center"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full border"
        style={{ background: 'var(--c-surface-2)', borderColor: 'var(--c-divider)' }}
      >
        <ImageIcon size={24} style={{ color: 'var(--c-text-3)' }} />
      </div>
      {subTab === 'liked' ? (
        <>
          <p className="text-sm font-semibold" style={{ color: 'var(--c-text-3)' }}>
            No liked stories yet
          </p>
          <p className="text-xs" style={{ color: 'var(--c-text-3)' }}>
            Heart posts in the feed to collect them here
          </p>
        </>
      ) : (
        <>
          <p className="text-sm font-semibold" style={{ color: 'var(--c-text-3)' }}>
            No posts created yet
          </p>
          <p className="text-xs" style={{ color: 'var(--c-text-3)' }}>
            Tap Create Post to share a story
          </p>
        </>
      )}
    </motion.div>
  )
}

// ── Main ProfileTab ────────────────────────────────────────────────────────────
export function ProfileTab() {
  const posts = useAppStore((s) => s.posts)
  const likedPostIds = useAppStore((s) => s.likedPostIds)
  const createdPostIds = useAppStore((s) => s.createdPostIds)
  const score = useAppStore((s) => s.score)
  const safeMode = useAppStore((s) => s.safeMode)
  const createPostOpen = useAppStore((s) => s.createPostOpen)
  const setCreatePostOpen = useAppStore((s) => s.setCreatePostOpen)
  const [subTab, setSubTab] = useState<SubTab>('created')

  const likedPosts = posts.filter((p) => likedPostIds.has(p.id))
  const createdPosts = posts.filter((p) => createdPostIds.includes(p.id))
  const activePosts = subTab === 'liked' ? likedPosts : createdPosts

  return (
    <div className="relative flex h-full flex-col overflow-hidden" style={{ background: 'var(--c-bg)' }}>
      {/* Scrollable content — offset below AppHeader */}
      <div
        className="flex-1 overflow-y-auto no-scrollbar"
        style={{
          paddingTop: 'max(calc(env(safe-area-inset-top) + 88px), 96px)',
          touchAction: 'pan-y',
        }}
      >
        {/* ── Profile Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-4 px-6 pb-4 pt-4">
          {/* Avatar with glow ring */}
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-md opacity-40 dark:opacity-50"
              style={{ background: 'oklch(53% 0.25 240)', transform: 'scale(1.15)' }}
            />
            <img
              src="https://i.pravatar.cc/150?img=99"
              alt="Your profile"
              className="relative h-20 w-20 rounded-full object-cover ring-2 ring-[oklch(53%_0.25_240/0.7)]"
            />
          </div>

          {/* Username */}
          <div className="text-center">
            <h1 className="text-base font-black" style={{ color: 'var(--c-text)' }}>
              @fact_hunter
            </h1>
            <p className="mt-0.5 text-xs" style={{ color: 'var(--c-text-3)' }}>
              Media literacy advocate 🔍
            </p>
          </div>

          {/* Stats row */}
          <div
            className="flex w-full items-center justify-around rounded-2xl px-4 py-3.5 border"
            style={{
              background: 'var(--c-surface)',
              borderColor: 'var(--c-divider)',
              boxShadow: '0 2px 12px oklch(0% 0 0 / 0.06)',
            }}
          >
            <StatPill
              icon={<Users size={12} className="text-[oklch(53%_0.25_240)]" />}
              value="2.4K"
              label="Followers"
            />
            <div className="h-8 w-px" style={{ background: 'var(--c-divider)' }} />
            <StatPill
              icon={<Star size={12} className="fill-yellow-500 text-yellow-500" />}
              value={score.toLocaleString()}
              label="MIL Points"
            />
            <div className="h-8 w-px" style={{ background: 'var(--c-divider)' }} />
            <StatPill
              icon={<Heart size={12} className="text-[oklch(58%_0.24_25)]" />}
              value={likedPostIds.size.toString()}
              label="Liked"
            />
          </div>
        </div>

        {/* ── Sub-Tab Navigation: Created / Liked ──────────────────────────── */}
        <div
          className="mx-4 mb-4 flex overflow-hidden rounded-2xl p-1 border"
          style={{ background: 'var(--c-surface-2)', borderColor: 'var(--c-divider)' }}
        >
          {(['created', 'liked'] as SubTab[]).map((tab) => {
            const isActive = subTab === tab
            const count = tab === 'liked' ? likedPosts.length : createdPosts.length
            return (
              <motion.button
                key={tab}
                onClick={() => setSubTab(tab)}
                className="relative flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold"
                style={{ color: isActive ? 'var(--c-text)' : 'var(--c-text-3)' }}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="profile-sub-tab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'var(--c-surface)',
                      boxShadow: '0 0 0 1px oklch(53% 0.25 240 / 0.35), 0 0 10px oklch(53% 0.25 240 / 0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 capitalize">
                  {tab === 'created' ? (
                    <PenSquare size={13} />
                  ) : (
                    <Heart
                      size={13}
                      className={isActive ? 'fill-[oklch(58%_0.24_25)] text-[oklch(58%_0.24_25)]' : ''}
                    />
                  )}
                  {tab}
                  {count > 0 && (
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                      style={{
                        background: isActive ? 'var(--c-surface-2)' : 'var(--c-surface-3)',
                        color: 'var(--c-text-2)',
                      }}
                    >
                      {count}
                    </span>
                  )}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* ── Posts Grid ─────────────────────────────────────────────────────── */}
        <div className="px-4 pb-32">
          <AnimatePresence mode="popLayout">
            {activePosts.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {activePosts.map((post, i) => (
                  <GridPostCard
                    key={`${subTab}-${post.id}`}
                    post={post}
                    index={i}
                    safeMode={safeMode}
                    badge={
                      subTab === 'liked' ? (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(58%_0.24_25/0.85)]">
                          <Heart size={11} className="fill-white text-white" />
                        </div>
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[oklch(53%_0.25_240/0.85)]">
                          <PenSquare size={11} className="text-white" />
                        </div>
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <EmptyState subTab={subTab} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Floating Create Post Button — ONLY on Profile tab ──────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-center z-10"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
      >
        <motion.button
          id="btn-create-post"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => setCreatePostOpen(true)}
          className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, oklch(53% 0.25 240), oklch(48% 0.28 270))',
            boxShadow: '0 0 24px oklch(53% 0.25 240 / 0.5), 0 6px 20px oklch(0% 0 0 / 0.35)',
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          Create Post
        </motion.button>
      </div>

      {/* Create Post Modal rendered right here inside ProfileTab */}
      <CreatePostModal isOpen={createPostOpen} onClose={() => setCreatePostOpen(false)} />
    </div>
  )
}
