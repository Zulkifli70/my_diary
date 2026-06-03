import { todayIso } from "../data/diary";
import type { DiaryEntry, DraftEntry, View } from "../types/diary";
import { formatMonthYear, getCalendarDays, shiftMonth } from "../utils/date";
import { getEntrySummary, countWords } from "../utils/entry";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type CalendarViewProps = {
  entries: DiaryEntry[];
  selectedDate: string;
  selectedEntry?: DiaryEntry;
  streak: number;
  totalWords: number;
  onDateSelect: (date: string) => void;
  onDraftChange: (updater: (current: DraftEntry) => DraftEntry) => void;
  onReadEntry: (entry: DiaryEntry) => void;
  onViewChange: (view: View) => void;
};

export function CalendarView({
  entries,
  selectedDate,
  selectedEntry,
  streak,
  totalWords,
  onDateSelect,
  onDraftChange,
  onReadEntry,
  onViewChange,
}: CalendarViewProps) {
  const calendarDays = getCalendarDays(selectedDate);
  const selectedDateLabel = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${selectedDate}T12:00:00`));
  const visibleMonth = selectedDate.slice(0, 7);
  const entriesThisMonth = entries.filter((entry) =>
    entry.date.startsWith(visibleMonth),
  ).length;
  const selectedEntryWords = selectedEntry ? countWords(selectedEntry.body) : 0;

  return (
    <section className="panel calendar-view" aria-labelledby="calendar-title">
      <div className="calendar-layout">
        <div className="calendar-main">
          <header className="calendar-header">
            <div>
              <h2 id="calendar-title">{formatMonthYear(selectedDate)}</h2>
              <p>{entriesThisMonth} entries this month</p>
            </div>

            <div
              className="calendar-nav"
              aria-label="Calendar month navigation"
            >
              <button
                aria-label="Previous month"
                onClick={() => onDateSelect(shiftMonth(selectedDate, -1))}
                type="button"
              >
                <LuChevronLeft aria-hidden="true" />
              </button>
              <button
                aria-label="Next month"
                onClick={() => onDateSelect(shiftMonth(selectedDate, 1))}
                type="button"
              >
                <LuChevronRight aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <span className="weekday" key={day}>
                {day}
              </span>
            ))}

            {calendarDays.map(({ date, isoDate, isCurrentMonth }) => {
              const hasEntry = entries.some((entry) => entry.date === isoDate);
              const isSelected = isoDate === selectedDate;
              const isToday = isoDate === todayIso;

              return (
                <button
                  className={[
                    "calendar-day",
                    !isCurrentMonth ? "muted-day" : "",
                    hasEntry ? "has-entry" : "",
                    isSelected ? "selected" : "",
                    isToday ? "today" : "",
                  ].join(" ")}
                  key={isoDate}
                  onClick={() => onDateSelect(isoDate)}
                  type="button"
                >
                  <span>{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="calendar-side">
          <article className="quick-read">
            <div className="card-heading">
              <p className="eyebrow">Selected Date</p>
              <span>{selectedDateLabel}</span>
            </div>

            {selectedEntry ? (
              <>
                <h3>{selectedEntry.title}</h3>
                <p>{getEntrySummary(selectedEntry.body)}</p>
                <div className="mood-row">
                  <span
                    className={`mood-chip ${selectedEntry.mood.toLowerCase()}`}
                  >
                    {selectedEntry.mood}
                  </span>
                  <span className="mood-chip neutral">
                    {selectedEntryWords} words
                  </span>
                </div>
                <button onClick={() => onReadEntry(selectedEntry)} type="button">
                  Open this page
                </button>
              </>
            ) : (
              <>
                <h3>No entry yet</h3>
                <p>
                  This day is still blank. Open the editor when you are ready to
                  leave a note here.
                </p>
                <button
                  onClick={() => {
                    onDraftChange((current) => ({
                      ...current,
                      date: selectedDate,
                    }));
                    onViewChange("editor");
                  }}
                  type="button"
                >
                  Write for this day
                </button>
              </>
            )}
          </article>

          <article className="calendar-card quick-stats">
            <h3>Quick Stats</h3>
            <dl>
              <div>
                <dt>Streak</dt>
                <dd>{streak} Days</dd>
              </div>
              <div>
                <dt>Words written</dt>
                <dd>
                  {totalWords >= 1000
                    ? `${(totalWords / 1000).toFixed(1)}k`
                    : totalWords}
                </dd>
              </div>
            </dl>
          </article>

          <article className="atmosphere-card">
            <span>Atmosphere</span>
            <strong>Ethereal & Calm</strong>
          </article>
        </aside>
      </div>
    </section>
  );
}
