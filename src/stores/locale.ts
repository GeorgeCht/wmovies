import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LocaleState {
  locale: string
  // eslint-disable-next-line no-unused-vars
  setLocale: (locale: string) => void
}

export type InitialLocaleState = Pick<LocaleState, 'locale'>

export const initialState: InitialLocaleState = {
  locale: 'en',
}

const useLocaleStore = create(
  persist<LocaleState>(
    (set) => ({
      ...initialState,
      setLocale: (locale: string) => set({ locale }),
    }),
    {
      name: 'locale',
    },
  ),
)

export default useLocaleStore
