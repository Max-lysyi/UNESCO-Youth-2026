import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/useAppStore'
import { OnboardingScreen } from './components/OnboardingScreen'
import { TutorialScreen } from './components/TutorialScreen'
import { MainFeed } from './components/MainFeed'

const screenVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
}

export default function App() {
  const screen = useAppStore((s) => s.screen)

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[oklch(8%_0.015_240)]">
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
            <MainFeed />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
