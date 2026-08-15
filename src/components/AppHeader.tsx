import { motion } from 'framer-motion'
import { Star, Settings, Search, Home, User } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import type { AppTab } from '../store/useAppStore'
import { cn } from '../lib/utils'

const TABS: { tab: AppTab; label: string; icon: React.ReactNode }[] = [
  { tab: 'search', label: 'Search', icon: <Search size={14} strokeWidth={2} /> },
  { tab: 'feed', label: 'Feed', icon: <Home size={14} strokeWidth={2} /> },
  { tab: 'profile', label: 'Profile', icon: <User size={14} strokeWidth={2} /> },
]

interface AppHeaderProps {
  onSettingsOpen: () => void
}

export function AppHeader({ onSettingsOpen }: AppHeaderProps) {
  const score = useAppStore((s) => s.score)
  const activeTab = useAppStore((s) => s.activeTab)
  const setActiveTab = useAppStore((s) => s.setActiveTab)
  const safeMode = useAppStore((s) => s.safeMode)

  return (
    <div
      className="absolute top-0 left-0 right-0 z-40 flex flex-col"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        background: 'var(--c-glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--c-glass-border)',
      }}
    >
      {/* ── Row 1: Logo + Score / Settings Gear ──────────────────────────── */}
      <div className="flex items-center justify-between px-4 pb-1 pt-2.5">
        {/* Logo */}
        <div className="flex items-center gap-1.5">
          <span className="text-[15px] leading-none">🔍</span>
          <span
            className="text-sm font-black tracking-tight"
            style={{ color: 'var(--c-text)' }}
          >
            Fact<span className="text-[oklch(68%_0.22_25)]">Or</span>Fake
          </span>
          {/* Safe Mode badge */}
          {safeMode && (
            <span className="ml-1 rounded-full bg-[oklch(52%_0.2_150/0.2)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[oklch(52%_0.2_150)] ring-1 ring-[oklch(52%_0.2_150/0.35)] dark:bg-[oklch(52%_0.2_150/0.25)] dark:text-[oklch(72%_0.2_150)]">
              Safe
            </span>
          )}
        </div>

        {/* Right slot */}
        {activeTab === 'profile' ? (
          <motion.button
            id="btn-settings"
            whileTap={{ scale: 0.88 }}
            onClick={onSettingsOpen}
            className="flex h-8 w-8 items-center justify-center rounded-full border active:opacity-70"
            style={{
              background: 'var(--c-surface-2)',
              borderColor: 'var(--c-divider)',
              color: 'var(--c-text-3)',
            }}
          >
            <Settings size={15} style={{ color: 'var(--c-text-2)' }} />
          </motion.button>
        ) : (
          <motion.div
            key={score}
            initial={{ scale: 1.25, y: -4 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 18 }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 border"
            style={{
              background: 'var(--c-surface-2)',
              borderColor: 'var(--c-divider)',
            }}
          >
            <Star size={11} className="fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-bold" style={{ color: 'var(--c-text)' }}>
              {score}
            </span>
            <span className="text-[10px]" style={{ color: 'var(--c-text-3)' }}>
              pts
            </span>
          </motion.div>
        )}
      </div>

      {/* ── Row 2: Tab Navigation ─────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-0.5 px-3 pb-2.5">
        {TABS.map(({ tab, label, icon }) => {
          const isActive = activeTab === tab
          return (
            <motion.button
              key={tab}
              id={`nav-${tab}`}
              whileTap={{ scale: 0.93 }}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-colors duration-200',
              )}
              style={{
                color: isActive ? 'var(--c-text)' : 'var(--c-text-3)',
                background: isActive ? 'var(--c-surface-2)' : 'transparent',
                boxShadow: isActive
                  ? '0 0 0 1px oklch(53% 0.25 240 / 0.4), 0 0 10px oklch(53% 0.25 240 / 0.2)'
                  : 'none',
              }}
            >
              {icon}
              <span>{label}</span>
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
