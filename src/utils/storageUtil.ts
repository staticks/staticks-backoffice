import { IStore } from '../store'

interface IstorageStore {
  state: IStore
}

export const getToken = (): string | null => {
  const storageData = localStorage.getItem('staticks-store')

  if (!storageData) return null

  const parsedData: IstorageStore = JSON.parse(storageData)
  return parsedData?.state?.token
}
