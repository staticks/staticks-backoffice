import produce from 'immer'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export interface IStore {
  // auth
  token: string | null
  setToken: (token: string) => void
  removeToken: () => void
}

const useStore = create<IStore>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        setToken: (token: string) =>
          set(
            produce<IStore>(store => {
              store.token = token
            }),
            false,
            'setToken',
          ),
        removeToken: () =>
          set(
            produce<IStore>(store => {
              store.token = null
            }),
            false,
            'removeToken',
          ),
      }),
      {
        name: 'staticks-store',
        getStorage: () => localStorage,
      },
    ),
  ),
)

export default useStore
