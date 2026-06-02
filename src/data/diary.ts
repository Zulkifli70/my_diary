import type { DiaryEntry, Mood } from '../types/diary'

export const todayIso = '2026-06-02'

export const moods: Mood[] = ['Serene', 'Reflective', 'Grateful', 'Tender', 'Hopeful']

export const starterEntries: DiaryEntry[] = [
  {
    id: 1,
    title: 'A quieter morning',
    date: '2026-06-02',
    mood: 'Serene',
    body: 'The apartment felt calm before the day began. I made tea, opened the window, and let the slow air remind me that I do not have to rush every thought into shape.',
    image:
      'https://images.unsplash.com/photo-1499728603263-13726abce5fd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Small kindnesses',
    date: '2026-06-01',
    mood: 'Grateful',
    body: 'Someone held the door while my hands were full. It was brief, almost invisible, but the gesture stayed with me longer than I expected.',
  },
  {
    id: 3,
    title: 'Evening inventory',
    date: '2026-05-29',
    mood: 'Reflective',
    body: 'I noticed how much easier it is to name what went wrong than what was steady. Tonight I am practicing the opposite: warm food, clean sheets, one finished task.',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'A soft return',
    date: '2026-05-25',
    mood: 'Hopeful',
    body: 'The plan is simple: write a little, walk a little, answer one message I have been avoiding. Small doors still count as doors.',
  },
]
