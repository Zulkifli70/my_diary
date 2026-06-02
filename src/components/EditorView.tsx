import type { FormEvent } from 'react'
import { moods } from '../data/diary'
import type { DraftEntry, Mood } from '../types/diary'
import { countWords } from '../utils/entry'

type EditorViewProps = {
  draft: DraftEntry
  errors: {
    title: string
    body: string
  }
  selectedMood: Mood
  onDraftChange: (updater: (current: DraftEntry) => DraftEntry) => void
  onMoodChange: (mood: Mood) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function EditorView({
  draft,
  errors,
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
        <div className="field-group">
          <input
            aria-describedby={errors.title ? 'entry-title-error' : undefined}
            aria-invalid={Boolean(errors.title)}
            aria-label="Entry title"
            className={`title-input ${errors.title ? 'invalid' : ''}`}
            onChange={(event) => onDraftChange((current) => ({ ...current, title: event.target.value }))}
            placeholder="A title for this moment"
            value={draft.title}
          />
          {errors.title && (
            <p className="field-error" id="entry-title-error">
              {errors.title}
            </p>
          )}
        </div>

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

        <div className="field-group">
          <textarea
            aria-describedby={errors.body ? 'entry-body-error' : undefined}
            aria-invalid={Boolean(errors.body)}
            aria-label="Diary body"
            className={errors.body ? 'invalid' : ''}
            onChange={(event) => onDraftChange((current) => ({ ...current, body: event.target.value }))}
            placeholder="Begin with one true sentence..."
            value={draft.body}
          />
          {errors.body && (
            <p className="field-error" id="entry-body-error">
              {errors.body}
            </p>
          )}
        </div>

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
