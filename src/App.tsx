import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { CalendarView } from './components/CalendarView'
import { EditorView } from './components/EditorView'
import { SearchView } from './components/SearchView'
import { Sidebar } from './components/Sidebar'
import { TimelineView } from './components/TimelineView'
import { starterEntries, todayIso } from './data/diary'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import type { DiaryEntry, DraftEntry, Mood, MoodFilter, View } from './types/diary'
import { calculateStreak, countWords } from './utils/entry'
import './App.css'

const initialDraft: DraftEntry = {
  title: '',
  date: todayIso,
  body: '',
}

function App() {
  const [entries, setEntries] = useLocalStorageState<DiaryEntry[]>(
    'quiet-moments-entries',
    starterEntries,
  )
  const [activeView, setActiveView] = useState<View>('calendar')
  const [selectedDate, setSelectedDate] = useState(todayIso)
  const [selectedMood, setSelectedMood] = useState<Mood>('Serene')
  const [searchQuery, setSearchQuery] = useState('')
  const [moodFilter, setMoodFilter] = useState<MoodFilter>('All')
  const [draft, setDraft] = useState<DraftEntry>(initialDraft)

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries],
  )

  const selectedEntry = sortedEntries.find((entry) => entry.date === selectedDate)
  const totalWords = entries.reduce((total, entry) => total + countWords(entry.body), 0)
  const streak = useMemo(() => calculateStreak(entries, todayIso), [entries])

  const filteredEntries = sortedEntries.filter((entry) => {
    const matchesMood = moodFilter === 'All' || entry.mood === moodFilter
    const haystack = `${entry.title} ${entry.body}`.toLowerCase()

    return matchesMood && haystack.includes(searchQuery.toLowerCase())
  })

  const submitEntry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedBody = draft.body.trim()
    const trimmedTitle = draft.title.trim()

    if (!trimmedTitle || !trimmedBody) return

    const newEntry: DiaryEntry = {
      id: Date.now(),
      title: trimmedTitle,
      date: draft.date,
      mood: selectedMood,
      body: trimmedBody,
    }

    setEntries((current) => [newEntry, ...current])
    setDraft(initialDraft)
    setSelectedMood('Serene')
    setSelectedDate(newEntry.date)
    setActiveView('timeline')
  }

  return (
    <main className="app-shell">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        streak={streak}
        totalWords={totalWords}
      />

      <section className="workspace">
        {activeView === 'calendar' && (
          <CalendarView
            entries={entries}
            onDateSelect={setSelectedDate}
            onDraftChange={setDraft}
            onViewChange={setActiveView}
            selectedDate={selectedDate}
            selectedEntry={selectedEntry}
            streak={streak}
            totalWords={totalWords}
          />
        )}

        {activeView === 'editor' && (
          <EditorView
            draft={draft}
            onDraftChange={setDraft}
            onMoodChange={setSelectedMood}
            onSubmit={submitEntry}
            selectedMood={selectedMood}
          />
        )}

        {activeView === 'timeline' && <TimelineView entries={sortedEntries} />}

        {activeView === 'search' && (
          <SearchView
            entries={filteredEntries}
            moodFilter={moodFilter}
            onMoodFilterChange={setMoodFilter}
            onSearchQueryChange={setSearchQuery}
            searchQuery={searchQuery}
          />
        )}
      </section>
    </main>
  )
}

export default App
