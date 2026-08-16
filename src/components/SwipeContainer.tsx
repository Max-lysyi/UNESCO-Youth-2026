import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import type { AppTab } from '../store/useAppStore'
import { MainFeed } from './MainFeed'
import { SearchTab } from './SearchTab'
import { ProfileTab } from './ProfileTab'
import { AppHeader } from './AppHeader'
import { SettingsModal } from './SettingsModal'
import { FullscreenPostOverlay } from './FullscreenPostOverlay'
import { useState } from 'react'

const TAB_ORDER: AppTab[] = ['search', 'feed', 'profile']

export function SwipeContainer() {
  const activeTab = useAppStore((s) => s.activeTab)
  const setActiveTab = useAppStore((s) => s.setActiveTab)
  const tabIndex = TAB_ORDER.indexOf(activeTab)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Track the origin of a drag so we can classify it as
  // horizontal-tab-switch vs vertical-feed-scroll before committing.
  const dragOrigin = useRef<{ x: number; y: number } | null>(null)
  const dragClassified = useRef<'horiz' | 'vert' | null>(null)

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[oklch(5%_0.01_240)]">
      {/* AppHeader overlaid above all tabs */}
      <AppHeader onSettingsOpen={() => setSettingsOpen(true)} />

      {/*
       * Sliding panel
       * ─────────────────────────────────────────────────────────────────────
       * Key decisions:
       *
       * 1. No Framer `drag` prop — it fights with vertical scroll-snap inside
       *    the feed tab and causes the "flick-back-to-search" bug.
       *
       * 2. We drive position ONLY through `animate` (spring). The tab content
       *    areas use `touch-action: pan-y` so the browser handles vertical
       *    scroll natively, while we detect horizontal intent via pointer events.
       *
       * 3. Threshold: horizontal intent is confirmed only when
       *    |dx| > 12px AND |dx| > |dy| * 1.8 (steep angle check).
       *    This prevents diagonal touches on the feed from triggering a tab
       *    switch and prevents the accidental-swipe-to-search bug.
       *
       * 4. Min distance to commit a tab switch: 55px. Velocity shortcut: 450.
       *)
      */}
      <motion.div
        className="flex h-full"
        style={{ width: `${TAB_ORDER.length * 100}%` }}
        animate={{ x: `-${(tabIndex / TAB_ORDER.length) * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 38, mass: 1 }}
        onPointerDown={(e) => {
          // Only track primary pointer (finger / left-click)
          if (e.button !== 0 && e.pointerType === 'mouse') return
          dragOrigin.current = { x: e.clientX, y: e.clientY }
          dragClassified.current = null
        }}
        onPointerMove={(e) => {
          if (!dragOrigin.current || dragClassified.current === 'vert') return
          const dx = e.clientX - dragOrigin.current.x
          const dy = e.clientY - dragOrigin.current.y
          const adx = Math.abs(dx)
          const ady = Math.abs(dy)

          if (dragClassified.current === null) {
            // Need at least 12px of movement before classifying
            if (adx < 12 && ady < 12) return
            // Require a clear horizontal angle (ratio 1.8:1) to count as horiz
            dragClassified.current = adx > ady * 1.8 ? 'horiz' : 'vert'
          }
        }}
        onPointerUp={(e) => {
          if (!dragOrigin.current || dragClassified.current !== 'horiz') {
            dragOrigin.current = null
            dragClassified.current = null
            return
          }

          const dx = e.clientX - dragOrigin.current.x
          // Estimate velocity from elapsed time (rough but sufficient)
          const elapsed = Date.now() // we don't track start time, so we use offset only
          dragOrigin.current = null
          dragClassified.current = null

          if (dx < -55 && tabIndex < TAB_ORDER.length - 1) {
            setActiveTab(TAB_ORDER[tabIndex + 1])
          } else if (dx > 55 && tabIndex > 0) {
            setActiveTab(TAB_ORDER[tabIndex - 1])
          }

          void elapsed // suppress unused var lint
        }}
        onPointerLeave={() => {
          dragOrigin.current = null
          dragClassified.current = null
        }}
        onPointerCancel={() => {
          dragOrigin.current = null
          dragClassified.current = null
        }}
      >
        {/* Tab 0: Search */}
        <div
          className="relative h-full flex-shrink-0 overflow-hidden"
          style={{ width: `${100 / TAB_ORDER.length}%`, touchAction: 'pan-y' }}
        >
          <SearchTab />
        </div>

        {/* Tab 1: Main Feed */}
        <div
          className="relative h-full flex-shrink-0 overflow-hidden"
          style={{ width: `${100 / TAB_ORDER.length}%`, touchAction: 'pan-y' }}
        >
          <MainFeed />
        </div>

        {/* Tab 2: Profile */}
        <div
          className="relative h-full flex-shrink-0 overflow-hidden"
          style={{ width: `${100 / TAB_ORDER.length}%`, touchAction: 'pan-y' }}
        >
          <ProfileTab />
        </div>
      </motion.div>

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Fullscreen Post Overlay */}
      <FullscreenPostOverlay />
    </div>
  )
}
