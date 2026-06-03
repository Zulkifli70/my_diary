import { moods } from '../data/diary'
import type { DiaryEntry } from '../types/diary'
import { formatLongDate } from '../utils/date'
import { getEntrySummary, highlightMatch } from '../utils/entry'
import type { MoodFilter } from '../types/diary'

type TimelineViewProps = {
  entries: DiaryEntry[]
  moodFilter: MoodFilter
  searchQuery: string
  onDeleteEntry: (entryId: number) => void
  onEditEntry: (entry: DiaryEntry) => void
  onMoodFilterChange: (mood: MoodFilter) => void
  onReadEntry: (entry: DiaryEntry) => void
  onSearchQueryChange: (query: string) => void
}

export function TimelineView({
  entries,
  moodFilter,
  searchQuery,
  onDeleteEntry,
  onEditEntry,
  onMoodFilterChange,
  onReadEntry,
  onSearchQueryChange,
}: TimelineViewProps) {
  return (
    <section className="panel timeline-view" aria-labelledby="timeline-title">
      <div className="section-heading">
        <p className="eyebrow">Chronological list</p>
        <h2 id="timeline-title">Collected moments</h2>
      </div>

      <div className="search-tools">
        <input
          aria-label="Search entries"
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="Search by word or phrase"
          type="search"
          value={searchQuery}
        />

        <select
          aria-label="Mood filter"
          onChange={(event) => onMoodFilterChange(event.target.value as MoodFilter)}
          value={moodFilter}
        >
          <option>All</option>
          {moods.map((mood) => (
            <option key={mood}>{mood}</option>
          ))}
        </select>
      </div>

      <div className="timeline-list">
        {entries.map((entry) => (
          <article
            className={`timeline-entry ${entry.image ? '' : 'without-image'}`.trim()}
            key={entry.id}
          >
            {entry.image && <img alt="" src={entry.image} />}
            <div>
              <span className="date-label">{formatLongDate(entry.date)}</span>
              <h3>{highlightMatch(entry.title, searchQuery)}</h3>
              <p>{highlightMatch(getEntrySummary(entry.body), searchQuery)}</p>
              <div className="entry-actions">
                <span className={`mood-chip ${entry.mood.toLowerCase()}`}>{entry.mood}</span>
                <button onClick={() => onReadEntry(entry)} type="button">
                  Read more
                </button>
                <button onClick={() => onEditEntry(entry)} type="button">
                  Edit
                </button>
                <button onClick={() => onDeleteEntry(entry.id)} type="button">
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
