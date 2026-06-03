import type { DiaryEntry } from '../types/diary'
import { formatLongDate } from '../utils/date'
import { countWords } from '../utils/entry'

type EntryDetailViewProps = {
  entry: DiaryEntry
  onBack: () => void
  onDeleteEntry: (entryId: number) => void
  onEditEntry: (entry: DiaryEntry) => void
}

export function EntryDetailView({
  entry,
  onBack,
  onDeleteEntry,
  onEditEntry,
}: EntryDetailViewProps) {
  return (
    <section className="panel entry-detail-view" aria-labelledby="entry-detail-title">
      <button className="text-button" onClick={onBack} type="button">
        Back to timeline
      </button>

      <article className="entry-detail">
        {entry.image && <img alt="" src={entry.image} />}
        <span className="date-label">{formatLongDate(entry.date)}</span>
        <h2 id="entry-detail-title">{entry.title}</h2>
        <div className="mood-row">
          <span className={`mood-chip ${entry.mood.toLowerCase()}`}>{entry.mood}</span>
          <span className="mood-chip neutral">{countWords(entry.body)} words</span>
        </div>
        <p>{entry.body}</p>
        <div className="entry-actions detail-actions">
          <button className="journal-link-button" onClick={() => onEditEntry(entry)} type="button">
            Revise page
          </button>
          <button className="danger-link-button" onClick={() => onDeleteEntry(entry.id)} type="button">
            Remove page
          </button>
        </div>
      </article>
    </section>
  )
}
