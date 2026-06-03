import type { Mood } from "../types/diary";
import { toLocalIsoDate } from "../utils/date";

export const todayIso = toLocalIsoDate(new Date());

export const moods: Mood[] = [
  "Serene",
  "Reflective",
  "Grateful",
  "Tender",
  "Hopeful",
];
