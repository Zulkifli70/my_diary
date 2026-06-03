import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { CalendarView } from './components/CalendarView'
import { EditorView } from './components/EditorView'
import { EntryDetailView } from './components/EntryDetailView'
import { Sidebar } from './components/Sidebar'
import { TimelineView } from './components/TimelineView'
import { todayIso } from './data/diary'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import type { DiaryEntry, DraftEntry, Mood, MoodFilter, View } from './types/diary'
import { calculateStreak, countWords } from './utils/entry'
import './App.css'

const initialDraft: DraftEntry = {
  title: '',
  date: todayIso,
  body: '',
}

const initialDraftErrors = {
  title: '',
  body: '',
}

function App() {
  const [entries, setEntries] = useLocalStorageState<DiaryEntry[]>(
    'quiet-moments-entries-v3',
    [],
  )
  const [activeView, setActiveView] = useState<View>('calendar')
  const [selectedDate, setSelectedDate] = useState(todayIso)
  const [selectedMood, setSelectedMood] = useState<Mood>('Serene')
  const [selectedEntryId, setSelectedEntryId] = useState<number | null>(null)
  const [editingEntryId, setEditingEntryId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [moodFilter, setMoodFilter] = useState<MoodFilter>('All')
  const [draft, setDraft] = useState<DraftEntry>(initialDraft)
  const [draftErrors, setDraftErrors] = useState(initialDraftErrors)

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries],
  )

  const selectedEntry = sortedEntries.find((entry) => entry.date === selectedDate)
  const detailEntry = sortedEntries.find((entry) => entry.id === selectedEntryId)
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

    const nextErrors = {
      title: trimmedTitle ? '' : 'Please add a title before saving.',
      body: trimmedBody ? '' : 'Please write something in your entry first.',
    }

    setDraftErrors(nextErrors)

    if (nextErrors.title || nextErrors.body) return

    if (editingEntryId) {
      setEntries((current) =>
        current.map((entry) =>
          entry.id === editingEntryId
            ? {
                ...entry,
                title: trimmedTitle,
                date: draft.date,
                mood: selectedMood,
                body: trimmedBody,
              }
            : entry,
        ),
      )
      setSelectedEntryId(editingEntryId)
      setEditingEntryId(null)
      setActiveView('detail')
    } else {
      const newEntry: DiaryEntry = {
        id: Date.now(),
        title: trimmedTitle,
        date: draft.date,
        mood: selectedMood,
        body: trimmedBody,
      }

      setEntries((current) => [newEntry, ...current])
      setSelectedEntryId(newEntry.id)
      setSelectedDate(newEntry.date)
      setActiveView('detail')
    }

    setDraft(initialDraft)
    setDraftErrors(initialDraftErrors)
    setSelectedMood('Serene')
  }

  const updateDraft = (updater: (current: DraftEntry) => DraftEntry) => {
    setDraft((current) => {
      const nextDraft = updater(current)

      setDraftErrors((currentErrors) => ({
        title: nextDraft.title.trim() ? '' : currentErrors.title,
        body: nextDraft.body.trim() ? '' : currentErrors.body,
      }))

      return nextDraft
    })
  }

  const readEntry = (entry: DiaryEntry) => {
    setSelectedEntryId(entry.id)
    setSelectedDate(entry.date)
    setActiveView('detail')
  }

  const editEntry = (entry: DiaryEntry) => {
    setEditingEntryId(entry.id)
    setDraft({
      title: entry.title,
      date: entry.date,
      body: entry.body,
    })
    setDraftErrors(initialDraftErrors)
    setSelectedMood(entry.mood)
    setSelectedEntryId(entry.id)
    setActiveView('editor')
  }

  const cancelEdit = () => {
    setEditingEntryId(null)
    setDraft(initialDraft)
    setDraftErrors(initialDraftErrors)
    setSelectedMood('Serene')
    setActiveView(selectedEntryId ? 'detail' : 'timeline')
  }

  const deleteEntry = (entryId: number) => {
    const shouldDelete = window.confirm('Delete this journal entry?')

    if (!shouldDelete) return

    setEntries((current) => current.filter((entry) => entry.id !== entryId))

    if (selectedEntryId === entryId) {
      setSelectedEntryId(null)
      setActiveView('timeline')
    }

    if (editingEntryId === entryId) {
      cancelEdit()
    }
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
            onDraftChange={updateDraft}
            onReadEntry={readEntry}
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
            errors={draftErrors}
            isEditing={Boolean(editingEntryId)}
            onCancelEdit={cancelEdit}
            onDraftChange={updateDraft}
            onMoodChange={setSelectedMood}
            onSubmit={submitEntry}
            selectedMood={selectedMood}
          />
        )}

        {activeView === 'timeline' && (
          <TimelineView
            entries={filteredEntries}
            moodFilter={moodFilter}
            onMoodFilterChange={setMoodFilter}
            onCreateEntry={() => setActiveView('editor')}
            onReadEntry={readEntry}
            onSearchQueryChange={setSearchQuery}
            searchQuery={searchQuery}
          />
        )}

        {activeView === 'detail' && detailEntry && (
          <EntryDetailView
            entry={detailEntry}
            onBack={() => setActiveView('timeline')}
            onDeleteEntry={deleteEntry}
            onEditEntry={editEntry}
          />
        )}
      </section>
    </main>
  )
}

export default App
