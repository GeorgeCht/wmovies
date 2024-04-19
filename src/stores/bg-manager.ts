/* eslint no-unused-vars: 0 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BGBackdrop = string | 'none'

interface BGManagerState {
  backdrop: BGBackdrop
  video: string
  mute: 1 | 0
  setBackdrop: (backdrop: BGBackdrop) => void
  setVideo: (video: string) => void
  setMute: (mute: 1 | 0) => void
}

export type InitialBGBackdropState = Pick<
  BGManagerState,
  'video' | 'mute' | 'backdrop'
>

export const initialState: InitialBGBackdropState = {
  backdrop: 'none',
  video: 'none',
  mute: 1,
}

const useBGManager = create(
  persist<BGManagerState>(
    (set) => ({
      ...initialState,
      setBackdrop: (backdrop) => set(() => ({ backdrop })),
      setVideo: (video) => set(() => ({ video })),
      setMute: (mute) => set(() => ({ mute })),
    }),
    {
      name: 'interceptor',
    },
  ),
)

export default useBGManager
