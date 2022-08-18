import produce from 'immer'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export interface IStore {
  // auth
  token: string | null
  setToken: (token: string) => void
  removeToken: () => void
  // current project
  currentProjectId: number | null
  setCurrentProjectId: (id: number) => void
  removeCurrentProjectId: () => void
  // project token
  applicationToken: {
    [projectId: number]: string
  }
  getProjectToken: (projectId: number) => string | null
  setApplicationToken: (applicationToken: {
    [projectId: number]: string
  }) => void
  removeApplicationToken: () => void
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

        currentProjectId: null,
        setCurrentProjectId: (projectId: number) =>
          set(
            produce<IStore>(store => {
              store.currentProjectId = projectId
            }),
            false,
            'setCurrentProjectId',
          ),
        removeCurrentProjectId: () =>
          set(
            produce<IStore>(store => {
              store.currentProjectId = null
            }),
            false,
            'removeCurrentProjectId',
          ),

        applicationToken: {},
        getProjectToken: (projectId: number) =>
          get().applicationToken?.[projectId] || null,
        setApplicationToken: (applicationToken: {
          [projectId: number]: string
        }) =>
          set(
            produce<IStore>(store => {
              store.applicationToken = {
                ...store.applicationToken,
                ...applicationToken,
              }
            }),
            false,
            'setApplicationToken',
          ),
        removeApplicationToken: () =>
          set(
            produce<IStore>(store => {
              store.applicationToken = {}
            }),
            false,
            'removeApplicationToken',
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
