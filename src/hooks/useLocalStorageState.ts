import { useEffect, useState } from 'react'

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const savedValue = window.localStorage.getItem(key)
    return savedValue ? JSON.parse(savedValue) : initialValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
