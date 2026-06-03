import type { DiaryEntry } from '../types/diary'
import { formatLongDate } from '../utils/date'
import { getEntrySummary } from '../utils/entry'

type TimelineViewProps = {
  entries: DiaryEntry[]
}

export function TimelineView({ entries }: TimelineViewProps) {
  return (
    <section className="panel timeline-view" aria-labelledby="timeline-title">
      <div className="section-heading">
        <p className="eyebrow">Chronological list</p>
        <h2 id="timeline-title">Collected moments</h2>
      </div>

      <div className="timeline-list">
        {entries.map((entry) => (
          <article
            className={`timeline-entry ${entry.image ? '' : 'without-image'}`}
            key={entry.id}
          >
            {entry.image && <img alt="" src={entry.image} />}
            <div>
              <span className="date-label">{formatLongDate(entry.date)}</span>
              <h3>{entry.title}</h3>
              <p>{getEntrySummary(entry.body)}</p>
              <span className={`mood-chip ${entry.mood.toLowerCase()}`}>{entry.mood}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
