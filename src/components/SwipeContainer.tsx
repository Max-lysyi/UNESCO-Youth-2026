import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import type { AppTab } from '../store/useAppStore'
import { MainFeed } from './MainFeed'
import { SearchTab } from './SearchTab'
import { ProfileTab } from './ProfileTab'
import { AppHeader } from './AppHeader'
import { SettingsModal } from './SettingsModal'
import { FullscreenPostOverlay } from './FullscreenPostOverlay'

const TAB_ORDER: AppTab[] = ['search', 'feed', 'profile']

export function SwipeContainer() {
  const activeTab = useAppStore((s) => s.activeTab)
  const setActiveTab = useAppStore((s) => s.setActiveTab)
  const tabIndex = TAB_ORDER.indexOf(activeTab)
  const [settingsOpen, setSettingsOpen] = useState(false)


  // ── Swipe gesture tracking ────────────────────────────────────────────────
  // We use pointer events for detection (works on both touch & mouse) and
  // Framer Motion only for the smooth spring animation between tabs.
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const isDragging = useRef(false)

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY }
    isDragging.current = false
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointerStart.current) return
    const dx = Math.abs(e.clientX - pointerStart.current.x)
    const dy = Math.abs(e.clientY - pointerStart.current.y)
    if (dx > 8 && dx > dy) isDragging.current = true
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointerStart.current || !isDragging.current) {
      pointerStart.current = null
      isDragging.current = false
      return
    }

    const dx = e.clientX - pointerStart.current.x
    const dy = e.clientY - pointerStart.current.y
    pointerStart.current = null
    isDragging.current = false

    // Only switch if horizontal swipe dominates
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.4) return

    if (dx < 0 && tabIndex < TAB_ORDER.length - 1) {
      setActiveTab(TAB_ORDER[tabIndex + 1])
    } else if (dx > 0 && tabIndex > 0) {
      setActiveTab(TAB_ORDER[tabIndex - 1])
    }
  }

  return (
    <div
      className="relative h-dvh w-full overflow-hidden bg-[oklch(5%_0.01_240)]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={() => {
        pointerStart.current = null
        isDragging.current = false
      }}
    >
      {/* AppHeader overlaid above all tabs */}
      <AppHeader onSettingsOpen={() => setSettingsOpen(true)} />

      {/* Sliding panel — spring-animated based on active tab index */}
      <motion.div
        className="flex h-full"
        style={{ width: `${TAB_ORDER.length * 100}%` }}
        animate={{ x: `-${(tabIndex / TAB_ORDER.length) * 100}%` }}
        transition={{ type: 'spring', stiffness: 320, damping: 36, mass: 1 }}
        // Framer Motion drag="x" adds rubber-band feedback during swipe
        drag="x"
        dragElastic={{ left: tabIndex < TAB_ORDER.length - 1 ? 0.1 : 0, right: tabIndex > 0 ? 0.1 : 0 }}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          const { offset, velocity } = info
          const isHoriz = Math.abs(offset.x) > Math.abs(offset.y) * 1.3
          if (!isHoriz) return
          const didSwipeLeft = offset.x < -50 || velocity.x < -350
          const didSwipeRight = offset.x > 50 || velocity.x > 350
          if (didSwipeLeft && tabIndex < TAB_ORDER.length - 1) {
            setActiveTab(TAB_ORDER[tabIndex + 1])
          } else if (didSwipeRight && tabIndex > 0) {
            setActiveTab(TAB_ORDER[tabIndex - 1])
          }
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

