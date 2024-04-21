/* eslint no-unused-vars: 0 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface InterceptorState {
  urls: Array<string>
  isOpen: boolean
  pushUrl: (url: string) => void
  setIsOpen: (newState: boolean) => void
}

export type InitialInterceptorState = Pick<InterceptorState, 'urls' | 'isOpen'>

export const initialState: InitialInterceptorState = {
  urls: ['begin'],
  isOpen: false,
}

const useInterceptorStore = create(
  persist<InterceptorState>(
    (set) => ({
      ...initialState,
      pushUrl: (url: string) =>
        set((state) => ({
          urls:
            // Holds max 15 urls
            state.urls.length >= 15
              ? [...state.urls.slice(1), url]
              : [...state.urls, url],
        })),

      setIsOpen: (newState: boolean) => set(() => ({ isOpen: newState })),
    }),
    {
      name: 'interceptor',
    },
  ),
)

export default useInterceptorStore
