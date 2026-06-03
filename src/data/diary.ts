import type { DiaryEntry, Mood } from '../types/diary'

export const todayIso = '2026-06-03'

export const moods: Mood[] = ['Serene', 'Reflective', 'Grateful', 'Tender', 'Hopeful']

export const starterEntries: DiaryEntry[] = [
  {
    id: 1,
    title: 'Fresh page, steady pace',
    date: '2026-06-03',
    mood: 'Hopeful',
    body: 'I started the morning by clearing the desk, making a short list, and choosing one thing worth finishing well. The day feels lighter when it has a simple shape.',
    image:
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Little reset',
    date: '2026-06-02',
    mood: 'Serene',
    body: 'After lunch I stepped away from the screen, washed a cup, and let the quiet room settle around me. It was not dramatic, just enough to return with a clearer head.',
  },
  {
    id: 3,
    title: 'Notes after rain',
    date: '2026-06-01',
    mood: 'Reflective',
    body: 'The street looked newly washed this evening. I wrote down what I want to carry forward this week: patience, cleaner boundaries, and a habit of noticing small progress.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Kind reminder',
    date: '2026-05-31',
    mood: 'Grateful',
    body: 'I found an old note tucked inside a book and it made me smile. Some encouragement arrives late and still lands exactly where it needs to.',
  },
]
