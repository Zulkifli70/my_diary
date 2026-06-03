import type { DiaryEntry, Mood } from "../types/diary";
import { toLocalIsoDate } from "../utils/date";

export const todayIso = toLocalIsoDate(new Date());

export const moods: Mood[] = [
  "Serene",
  "Reflective",
  "Grateful",
  "Tender",
  "Hopeful",
];

export const starterEntries: DiaryEntry[] = [
  {
    id: 1,
    title: "Fresh page, steady pace",
    date: "2026-06-03",
    mood: "Hopeful",
    body: "I started the morning by clearing the desk, making a short list, and choosing one thing worth finishing well. The day feels lighter when it has a simple shape.",
  },
  {
    id: 2,
    title: "Little reset",
    date: "2026-06-02",
    mood: "Serene",
    body: "After lunch I stepped away from the screen, washed a cup, and let the quiet room settle around me. It was not dramatic, just enough to return with a clearer head.",
  },
  {
    id: 3,
    title: "Notes after rain",
    date: "2026-06-01",
    mood: "Reflective",
    body: "The street looked newly washed this evening. I wrote down what I want to carry forward this week: patience, cleaner boundaries, and a habit of noticing small progress.",
  },
  {
    id: 4,
    title: "Kind reminder",
    date: "2026-05-31",
    mood: "Grateful",
    body: "I found an old note tucked inside a book and it made me smile. Some encouragement arrives late and still lands exactly where it needs to.",
  },
];
