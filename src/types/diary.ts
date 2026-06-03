export type Mood = 'Serene' | 'Reflective' | 'Grateful' | 'Tender' | 'Hopeful'

export type DiaryEntry = {
  id: number
  title: string
  date: string
  mood: Mood
  body: string
  image?: string
}

export type DraftEntry = {
  title: string
  date: string
  body: string
}

export type MoodFilter = 'All' | Mood

export type View = 'calendar' | 'editor' | 'timeline' | 'detail'
