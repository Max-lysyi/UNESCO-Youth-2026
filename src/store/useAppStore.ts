import { create } from 'zustand'

export type AppScreen = 'onboarding' | 'tutorial' | 'feed'

interface AppState {
  screen: AppScreen
  score: number
  currentCardIndex: number
  setScreen: (screen: AppScreen) => void
  addScore: (points: number) => void
  nextCard: () => void
}

export const useAppStore = create<AppState>((set) => ({
  screen: 'onboarding',
  score: 0,
  currentCardIndex: 0,
  setScreen: (screen) => set({ screen }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  nextCard: () => set((state) => ({ currentCardIndex: state.currentCardIndex + 1 })),
}))
