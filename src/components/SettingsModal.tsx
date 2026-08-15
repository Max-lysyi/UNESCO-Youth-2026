import { motion, AnimatePresence } from 'framer-motion'
import { X, Moon, Sun, ShieldCheck } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ToggleRowProps {
  id: string
  icon: React.ReactNode
  label: string
  description: string
  checked: boolean
  onToggle: () => void
  accentColor?: string
}

function ToggleRow({ id, icon, label, description, checked, onToggle, accentColor = 'oklch(53% 0.25 240)' }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: `${accentColor} / 0.12`.includes('/')
              ? accentColor.replace(')', ' / 0.12)')
              : `color-mix(in oklab, ${accentColor} 12%, transparent)`,
            border: `1px solid color-mix(in oklab, ${accentColor} 25%, transparent)`,
          }}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--c-text)' }}>
            {label}
          </p>
          <p className="text-[11px]" style={{ color: 'var(--c-text-3)' }}>
            {description}
          </p>
        </div>
      </div>

      {/* Toggle switch */}
      <motion.button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={onToggle}
        className="relative h-7 w-12 flex-shrink-0 rounded-full transition-colors duration-300"
        style={{
          background: checked ? accentColor : 'var(--c-surface-3)',
          boxShadow: checked ? `0 0 12px color-mix(in oklab, ${accentColor} 45%, transparent)` : 'none',
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-md"
          animate={{ left: checked ? '26px' : '4px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  )
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const safeMode = useAppStore((s) => s.safeMode)
  const toggleSafeMode = useAppStore((s) => s.toggleSafeMode)
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="settings-backdrop"
            className="fixed inset-0 z-[60] backdrop-blur-sm"
            style={{ background: 'oklch(0% 0 0 / 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            key="settings-sheet"
            className="fixed bottom-0 left-1/2 z-[70] w-full -translate-x-1/2 overflow-hidden rounded-t-3xl"
            style={{
              maxWidth: '448px',
              background: 'var(--c-sheet-bg)',
              borderTop: '1px solid var(--c-divider)',
              paddingBottom: 'max(env(safe-area-inset-bottom), 20px)',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
          >
            {/* Drag handle */}
            <div
              className="mx-auto mt-3 h-1 w-10 rounded-full"
              style={{ background: 'var(--c-surface-3)' }}
            />

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 pb-4 pt-5"
              style={{ borderBottom: '1px solid var(--c-divider)' }}
            >
              <div>
                <h2 className="text-base font-black" style={{ color: 'var(--c-text)' }}>
                  Settings
                </h2>
                <p className="mt-0.5 text-xs" style={{ color: 'var(--c-text-3)' }}>
                  Customize your experience
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: 'var(--c-surface-2)', color: 'var(--c-text-2)' }}
              >
                <X size={15} />
              </motion.button>
            </div>

            {/* Toggles */}
            <div className="px-5" style={{ borderBottom: '1px solid var(--c-divider)' }}>
              <ToggleRow
                id="toggle-theme"
                icon={
                  theme === 'dark' ? (
                    <Moon size={16} className="text-[oklch(74%_0.18_240)]" />
                  ) : (
                    <Sun size={16} className="text-yellow-500" />
                  )
                }
                label="Theme"
                description={theme === 'dark' ? 'Currently Dark' : 'Currently Light'}
                checked={theme === 'light'}
                onToggle={toggleTheme}
              />
            </div>

            <div className="px-5">
              <ToggleRow
                id="toggle-safe-mode"
                icon={<ShieldCheck size={16} className="text-[oklch(52%_0.2_150)]" />}
                label="Safe Mode"
                description="Shows labels · Disables scoring"
                checked={safeMode}
                onToggle={toggleSafeMode}
                accentColor="oklch(52% 0.2 150)"
              />
            </div>

            {/* Safe Mode explanation */}
            <AnimatePresence>
              {safeMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mx-5 mb-2 overflow-hidden"
                >
                  <div
                    className="rounded-2xl p-4 border"
                    style={{
                      background: 'oklch(52% 0.2 150 / 0.1)',
                      borderColor: 'oklch(52% 0.2 150 / 0.25)',
                    }}
                  >
                    <p className="text-[11px] leading-relaxed text-[oklch(42%_0.18_150)] dark:text-[oklch(72%_0.2_150)]">
                      🛡️ <strong>Safe Mode is ON</strong> — Fact/Fake labels are visible on all posts.
                      Answering posts does not earn points.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
