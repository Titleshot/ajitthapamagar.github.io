/**
 * First name for greetings. Falls back to Nepali "member" when input looks empty,
 * too long, non-name characters, or random Latin keyboard-mash (low vowel ratio).
 */
export function sanitizeDisplayFirstName(raw?: string, fallbackMember = 'सदस्य'): string {
  const value = (raw ?? '').trim()
  if (!value || value.length > 48) return fallbackMember

  const first = value.split(/\s+/)[0] ?? ''
  if (!first || first.length > 24) return fallbackMember

  if (!/^[\p{L}\s.'-]+$/u.test(first)) return fallbackMember

  // Devanagari / mixed scripts: trust if it passes basic checks
  if (/[\u0900-\u097F]/.test(first)) {
    return first.length <= 20 ? first : fallbackMember
  }

  // Latin-only: reject very low vowel density (typical of gibberish like "ksjsfhskdjhfk")
  if (/^[a-zA-Z.'-]+$/.test(first) && first.length >= 8) {
    const vowels = (first.match(/[aeiouAEIOU]/g) ?? []).length
    const ratio = vowels / first.length
    if (ratio < 0.22) return fallbackMember
  }

  // Single long lowercase token with no internal capitals often looks like test junk
  if (/^[a-z]{12,}$/.test(first)) return fallbackMember

  return first
}
