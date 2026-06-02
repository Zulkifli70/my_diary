import type { FormEvent } from 'react'
import { moods } from '../data/diary'
import type { DraftEntry, Mood } from '../types/diary'
import { countWords } from '../utils/entry'

type EditorViewProps = {
  draft: DraftEntry
  selectedMood: Mood
  onDraftChange: (updater: (current: DraftEntry) => DraftEntry) => void
  onMoodChange: (mood: Mood) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function EditorView({
  draft,
  selectedMood,
  onDraftChange,
  onMoodChange,
  onSubmit,
}: EditorViewProps) {
  return (
    <section className="panel editor-view" aria-labelledby="editor-title">
      <div className="section-heading">
        <p className="eyebrow">Distraction-free editor</p>
        <h2 id="editor-title">Let the page stay quiet.</h2>
      </div>

      <form className="entry-form" onSubmit={onSubmit}>
        <input
          aria-label="Entry title"
          className="title-input"
          onChange={(event) => onDraftChange((current) => ({ ...current, title: event.target.value }))}
          placeholder="A title for this moment"
          value={draft.title}
        />

        <div className="editor-meta">
          <label>
            Date
            <input
              onChange={(event) => onDraftChange((current) => ({ ...current, date: event.target.value }))}
              type="date"
              value={draft.date}
            />
          </label>

          <div className="mood-picker" aria-label="Mood">
            {moods.map((mood) => (
              <button
                className={selectedMood === mood ? 'selected' : ''}
                key={mood}
                onClick={() => onMoodChange(mood)}
                type="button"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <textarea
          aria-label="Diary body"
          onChange={(event) => onDraftChange((current) => ({ ...current, body: event.target.value }))}
          placeholder="Begin with one true sentence..."
          value={draft.body}
        />

        <div className="editor-actions">
          <span>{countWords(draft.body)} words</span>
          <button className="primary-button" type="submit">
            Save entry
          </button>
        </div>
      </form>
    </section>
  )
}
