import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'

export function OnboardingScreen() {
  const setScreen = useAppStore((s) => s.setScreen)

  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-between overflow-hidden px-6 pb-12 pt-16">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-24 h-80 w-80 rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(53% 0.25 240 / 0.35) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(68% 0.22 25 / 0.3) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, oklch(74% 0.18 270 / 0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Logo + App name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex items-center gap-2 rounded-2xl bg-[oklch(100%_0_0/0.08)] px-5 py-2 backdrop-blur-xl border border-[oklch(100%_0_0/0.12)]">
          <span className="text-xl">🔍</span>
          <span className="text-lg font-black tracking-tight text-white">
            Fact<span className="text-[oklch(68%_0.22_25)]">Or</span>Fake
          </span>
        </div>
      </motion.div>

      {/* Owl mascot + speech bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
        className="flex flex-col items-center gap-6"
      >
        {/* Owl */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 blur-2xl opacity-40"
            style={{ background: 'radial-gradient(circle, oklch(74% 0.18 240) 0%, transparent 70%)' }}
          />
          <div className="text-[110px] drop-shadow-2xl leading-none select-none">🦉</div>
          {/* Detective coat badge */}
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -right-3 text-4xl drop-shadow-lg"
          >
            🕵️
          </motion.div>
        </motion.div>

        {/* Speech bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="relative max-w-[280px] rounded-3xl rounded-tl-sm bg-white px-6 py-5 shadow-2xl"
        >
          {/* Bubble pointer */}
          <div className="absolute -top-3 left-6 h-0 w-0 border-x-[10px] border-b-[14px] border-x-transparent border-b-white" />
          <p className="text-center text-sm font-semibold leading-relaxed text-gray-800">
            Привіт! Я твій гід. Хочеш дізнатися, як тут все працює?
          </p>
          {/* Sparkle decorations */}
          <span className="absolute -top-3 right-4 text-lg">✨</span>
        </motion.div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="flex w-full max-w-xs flex-col gap-3"
      >
        <motion.button
          id="btn-start-tutorial"
          whileTap={{ scale: 0.97 }}
          onClick={() => setScreen('tutorial')}
          className="w-full rounded-2xl bg-[oklch(53%_0.25_240)] px-8 py-4 text-base font-bold text-white shadow-xl"
          style={{ boxShadow: '0 0 30px oklch(53% 0.25 240 / 0.4)' }}
        >
          🎓 Пройти навчання
        </motion.button>
        <motion.button
          id="btn-skip-tutorial"
          whileTap={{ scale: 0.97 }}
          onClick={() => setScreen('feed')}
          className="w-full rounded-2xl border border-[oklch(100%_0_0/0.15)] bg-[oklch(100%_0_0/0.06)] px-8 py-4 text-base font-medium text-[oklch(84%_0.04_240)] backdrop-blur-xl"
        >
          Пропустити →
        </motion.button>
      </motion.div>
    </div>
  )
}
