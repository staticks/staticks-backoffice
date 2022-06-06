import { IStore } from '../store'

interface IstorageStore {
  store: IStore
}

export const getToken = (): string | null => {
  const storageData = localStorage.getItem('staticks-store')

  if (!storageData) return null

  const parsedData: IstorageStore = JSON.parse(storageData)
  return parsedData?.store?.token
}
