import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import { OnboardingScreen } from './components/OnboardingScreen'
import { TutorialScreen } from './components/TutorialScreen'
import { SwipeContainer } from './components/SwipeContainer'

const screenVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
}

export default function App() {
  const screen = useAppStore((s) => s.screen)

  return (
    /*
     * Outer shell — fills the full browser window and gives the desktop
     * a neutral backdrop behind the mobile-width card.
     */
    <div
      className="flex h-dvh w-full items-center justify-center bg-neutral-900 dark:bg-black"
    >
      {/*
       * ── Mobile-width constraint ────────────────────────────────────────
       * Everything inside this div is capped at 448px (≈ max-w-md) so the
       * app always looks like a phone screen, even on ultra-wide monitors.
       * shadow-2xl gives the "phone floating on desktop" illusion.
       */}
      <div
        id="app-shell"
        className="relative w-full h-dvh overflow-hidden shadow-2xl"
        style={{ maxWidth: '448px' }}
      >
        {/* Page-level background adapts to theme */}
        <div className="absolute inset-0 bg-white dark:bg-[oklch(5%_0.01_240)]" />

        <AnimatePresence mode="wait">
          {screen === 'onboarding' && (
            <motion.div
              key="onboarding"
              className="absolute inset-0"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <OnboardingScreen />
            </motion.div>
          )}

          {screen === 'tutorial' && (
            <motion.div
              key="tutorial"
              className="absolute inset-0"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <TutorialScreen />
            </motion.div>
          )}

          {screen === 'feed' && (
            <motion.div
              key="feed"
              className="absolute inset-0"
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
            >
              <SwipeContainer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
