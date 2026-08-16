import { create } from 'zustand'
import { NEWS_POSTS, shuffleArray } from '../data/posts'
import type { NewsPost } from '../data/posts'

export type AppScreen = 'onboarding' | 'tutorial' | 'feed'
export type AppTab = 'search' | 'feed' | 'profile'

interface AppState {
  // ── Screen ────────────────────────────────────────────────────────────────
  screen: AppScreen
  setScreen: (screen: AppScreen) => void

  // ── Score / Game ──────────────────────────────────────────────────────────
  score: number
  currentCardIndex: number
  addScore: (points: number) => void
  nextCard: () => void
  resetGame: () => void

  // ── Global Posts ──────────────────────────────────────────────────────────
  posts: NewsPost[]
  addPost: (post: NewsPost) => void

  // ── Liked Posts ───────────────────────────────────────────────────────────
  likedPostIds: Set<string>
  toggleLike: (postId: string) => void

  // ── Answered Posts (prevents re-voting on same post) ─────────────────────
  answeredPostIds: Set<string>
  recordAnswer: (postId: string) => void

  // ── Created Posts ─────────────────────────────────────────────────────────
  createdPostIds: string[]

  // ── Tab Navigation ────────────────────────────────────────────────────────
  activeTab: AppTab
  setActiveTab: (tab: AppTab) => void

  // ── Full-Screen Post Overlay ──────────────────────────────────────────────
  fullscreenPost: NewsPost | null
  setFullscreenPost: (post: NewsPost | null) => void

  // ── Settings ──────────────────────────────────────────────────────────────
  safeMode: boolean
  toggleSafeMode: () => void
  theme: 'dark' | 'light'
  toggleTheme: () => void

  // ── Create Post Modal ─────────────────────────────────────────────────────
  createPostOpen: boolean
  setCreatePostOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  // ── Screen ────────────────────────────────────────────────────────────────
  screen: 'onboarding',
  setScreen: (screen) => set({ screen }),

  // ── Score / Game ──────────────────────────────────────────────────────────
  score: 0,
  currentCardIndex: 0,
  addScore: (points) =>
    set((state) => {
      // Points are disabled when Safe Mode is on
      if (state.safeMode) return {}
      return { score: state.score + points }
    }),
  nextCard: () => set((state) => ({ currentCardIndex: state.currentCardIndex + 1 })),
  resetGame: () => set({ score: 0, currentCardIndex: 0 }),

  // ── Global Posts — shuffled with Fisher-Yates on init ────────────────────
  posts: shuffleArray([...NEWS_POSTS]),
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
      createdPostIds: [post.id, ...state.createdPostIds],
    })),

  // ── Liked Posts ───────────────────────────────────────────────────────────
  likedPostIds: new Set<string>(),
  toggleLike: (postId) =>
    set((state) => {
      const next = new Set(state.likedPostIds)
      if (next.has(postId)) {
        next.delete(postId)
      } else {
        next.add(postId)
      }
      return { likedPostIds: next }
    }),

  // ── Answered Posts ────────────────────────────────────────────────────────
  answeredPostIds: new Set<string>(),
  recordAnswer: (postId) =>
    set((state) => {
      const next = new Set(state.answeredPostIds)
      next.add(postId)
      return { answeredPostIds: next }
    }),

  // ── Created Posts ─────────────────────────────────────────────────────────
  createdPostIds: [],

  // ── Tab Navigation ────────────────────────────────────────────────────────
  activeTab: 'feed',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // ── Full-Screen Post Overlay ──────────────────────────────────────────────
  fullscreenPost: null,
  setFullscreenPost: (post) => set({ fullscreenPost: post }),

  // ── Settings ──────────────────────────────────────────────────────────────
  safeMode: false,
  toggleSafeMode: () => set((state) => ({ safeMode: !state.safeMode })),
  theme: 'dark',
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark'
      // Toggle the 'dark' class on <html> — Tailwind v4 @custom-variant dark
      if (next === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme: next }
    }),

  // ── Create Post Modal ─────────────────────────────────────────────────────
  createPostOpen: false,
  setCreatePostOpen: (open) => set({ createPostOpen: open }),
}))
