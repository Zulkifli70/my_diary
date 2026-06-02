import { moods } from '../data/diary'
import type { DiaryEntry, MoodFilter } from '../types/diary'
import { formatShortDate } from '../utils/date'
import { getEntrySummary, highlightMatch } from '../utils/entry'

type SearchViewProps = {
  entries: DiaryEntry[]
  moodFilter: MoodFilter
  searchQuery: string
  onMoodFilterChange: (mood: MoodFilter) => void
  onSearchQueryChange: (query: string) => void
}

export function SearchView({
  entries,
  moodFilter,
  searchQuery,
  onMoodFilterChange,
  onSearchQueryChange,
}: SearchViewProps) {
  return (
    <section className="panel search-view" aria-labelledby="search-title">
      <div className="section-heading">
        <p className="eyebrow">Smart search</p>
        <h2 id="search-title">Find a thread of thought.</h2>
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

      <div className="search-results">
        {entries.map((entry) => (
          <article key={entry.id}>
            <span className="date-label">{formatShortDate(entry.date)}</span>
            <h3>{highlightMatch(entry.title, searchQuery)}</h3>
            <p>{highlightMatch(getEntrySummary(entry.body), searchQuery)}</p>
            <span className={`mood-chip ${entry.mood.toLowerCase()}`}>{entry.mood}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
