/* eslint no-unused-vars: 0 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TvSeriesTrackerState {
  id: string
  data: TvDetailsWithImageAndVideos | undefined
  setId: (id: string) => void
  setData: (data: TvDetailsWithImageAndVideos) => void
}

export type InitialTvSeriesTrackerState = Pick<
  TvSeriesTrackerState,
  'id' | 'data'
>

export const initialState: InitialTvSeriesTrackerState = {
  id: '',
  data: undefined,
}

const useTvSeriesTrackerStore = create(
  persist<TvSeriesTrackerState>(
    (set) => ({
      ...initialState,
      setId: (id: string) => set(() => ({ id })),
      setData: (data: TvDetailsWithImageAndVideos) => set(() => ({ data })),
    }),
    {
      name: 'tvSeriesTracker',
    },
  ),
)

export default useTvSeriesTrackerStore
