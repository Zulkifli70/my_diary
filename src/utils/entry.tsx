import type { ReactNode } from 'react'
import type { DiaryEntry } from '../types/diary'

export const countWords = (text: string) =>
  text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

export const getEntrySummary = (body: string) =>
  body.length > 138 ? `${body.slice(0, 138).trim()}...` : body

export const calculateStreak = (entries: DiaryEntry[], todayIso: string) => {
  const entryDates = new Set(entries.map((entry) => entry.date))
  const cursor = new Date(`${todayIso}T12:00:00`)
  let total = 0

  while (entryDates.has(cursor.toISOString().slice(0, 10))) {
    total += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  return total
}

export const highlightMatch = (text: string, query: string): ReactNode => {
  if (!query.trim()) return text

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={`${part}-${index}`}>{part}</mark>
    ) : (
      part
    ),
  )
}
