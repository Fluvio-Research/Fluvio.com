/**
 * Lightweight emphasis markup for headings.
 *
 * Editors wrap one phrase of a heading in asterisks (`Water *as it moves*`)
 * and the site renders that phrase in the accent face. The markup never
 * reaches places that need plain text (page titles, aria labels, status
 * announcements); use `plainText` there.
 */

export interface AccentSegment {
  text: string;
  accent: boolean;
}

const ACCENT_PATTERN = /\*([^*]+)\*/g;

/** Split a heading into plain and accented runs, in document order. */
export const splitAccent = (text: string): AccentSegment[] => {
  const segments: AccentSegment[] = [];
  let cursor = 0;

  for (const match of text.matchAll(ACCENT_PATTERN)) {
    const start = match.index ?? 0;
    if (start > cursor) segments.push({ text: text.slice(cursor, start), accent: false });
    segments.push({ text: match[1], accent: true });
    cursor = start + match[0].length;
  }

  if (cursor < text.length) segments.push({ text: text.slice(cursor), accent: false });
  return segments;
};

/** The heading with its accent markup removed. */
export const plainText = (text: string): string => text.replace(ACCENT_PATTERN, '$1');
