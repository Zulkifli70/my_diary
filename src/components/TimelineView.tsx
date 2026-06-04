import { moods } from "../data/diary";
import type { DiaryEntry } from "../types/diary";
import { formatLongDate } from "../utils/date";
import { getEntrySummary, highlightMatch } from "../utils/entry";
import type { MoodFilter } from "../types/diary";

type TimelineViewProps = {
  entries: DiaryEntry[];
  moodFilter: MoodFilter;
  searchQuery: string;
  onMoodFilterChange: (mood: MoodFilter) => void;
  onCreateEntry: () => void;
  onReadEntry: (entry: DiaryEntry) => void;
  onSearchQueryChange: (query: string) => void;
};

const formatTimelineGroupLabel = (date: string) => {
  const entryDate = new Date(`${date}T12:00:00`);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const toLocalIsoDate = (value: Date) => {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, "0");
    const day = `${value.getDate()}`.padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  if (date === toLocalIsoDate(today)) return "Today";
  if (date === toLocalIsoDate(yesterday)) return "Yesterday";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year:
      entryDate.getFullYear() === today.getFullYear() ? undefined : "numeric",
  }).format(entryDate);
};

export function TimelineView({
  entries,
  moodFilter,
  searchQuery,
  onCreateEntry,
  onMoodFilterChange,
  onReadEntry,
  onSearchQueryChange,
}: TimelineViewProps) {
  const groupedEntries = entries.reduce<
    Array<{ date: string; entries: DiaryEntry[] }>
  >((groups, entry) => {
    const currentGroup = groups.at(-1);

    if (currentGroup?.date === entry.date) {
      currentGroup.entries.push(entry);
    } else {
      groups.push({ date: entry.date, entries: [entry] });
    }

    return groups;
  }, []);

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
          onChange={(event) =>
            onMoodFilterChange(event.target.value as MoodFilter)
          }
          value={moodFilter}
        >
          <option>All</option>
          {moods.map((mood) => (
            <option key={mood}>{mood}</option>
          ))}
        </select>
      </div>

      {groupedEntries.length === 0 ? (
        <div className="timeline-empty-state">
          <img
            className="timeline-empty-image"
            src="/book.png"
            alt="book icon"
          />
          <h2>Your Story Begin Here</h2>
          <p className="timeline-empty-para">
            "Every great journey starts with a single word. What's on your mind
            today?"
          </p>
          <button
            className="new-entry-button timeline-empty-button"
            onClick={onCreateEntry}
            type="button"
          >
            Create your first journal
          </button>
        </div>
      ) : (
        <div className="timeline-list">
          {groupedEntries.map((group) => (
            <section
              className="timeline-day"
              key={group.date}
              aria-label={formatLongDate(group.date)}
            >
              <div className="timeline-day-label">
                <span>{formatTimelineGroupLabel(group.date)}</span>
              </div>

              <div className="timeline-day-entries">
                {group.entries.map((entry) => (
                  <article
                    className={`timeline-entry ${entry.image ? "" : "without-image"}`.trim()}
                    key={entry.id}
                  >
                    {entry.image && <img alt="" src={entry.image} />}
                    <div>
                      <span className="date-label">
                        {formatLongDate(entry.date)}
                      </span>
                      <h3>{highlightMatch(entry.title, searchQuery)}</h3>
                      <p>
                        {highlightMatch(
                          getEntrySummary(entry.body),
                          searchQuery,
                        )}
                      </p>
                      <div className="entry-actions timeline-entry-actions">
                        <span
                          className={`mood-chip ${entry.mood.toLowerCase()}`}
                        >
                          {entry.mood}
                        </span>
                        <button
                          className="journal-link-button"
                          onClick={() => onReadEntry(entry)}
                          type="button"
                        >
                          Open page
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
