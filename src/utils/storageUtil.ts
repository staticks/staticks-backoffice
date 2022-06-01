export const getToken = (): string | null => {
  const storageData = localStorage.getItem('staticks-store')

  if (storageData) {
    const parsedData = JSON.parse(storageData)
    return parsedData?.state?.token
  } else {
    return null
  }
}
