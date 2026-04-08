// gradeUtils.js

/**
 * Returns Tailwind classes + label for a given grade string.
 * Grade format examples: 1SS, 1BC, 1A, 2B, 3C, UDFA
 */

export const GRADE_ORDER = {
  SS: 0,
  BC: 1,
  A:  2,
  B:  3,
  C:  4,
  UDFA: 5,
}

export function parseGrade(grade = '') {
  const g = grade.trim().toUpperCase()
  if (g === 'UDFA') return { round: null, tier: 'UDFA', raw: g }

  // e.g. "1SS", "2BC", "3A", "4B", "5C"
  const match = g.match(/^(\d)(SS|BC|A|B|C)$/)
  if (!match) return { round: null, tier: 'UDFA', raw: g }

  return { round: parseInt(match[1], 10), tier: match[2], raw: g }
}

export function gradeSort(a, b) {
  const ga = parseGrade(a)
  const gb = parseGrade(b)

  const tierA = GRADE_ORDER[ga.tier] ?? 99
  const tierB = GRADE_ORDER[gb.tier] ?? 99
  if (tierA !== tierB) return tierA - tierB

  const roundA = ga.round ?? 99
  const roundB = gb.round ?? 99
  return roundA - roundB
}

const BADGE_STYLES = {
  SS:   'bg-amber-400 text-amber-950 ring-1 ring-amber-500',
  BC:   'bg-blue-600 text-white ring-1 ring-blue-700',
  A:    'bg-emerald-500 text-white ring-1 ring-emerald-600',
  B:    'bg-slate-500 text-white ring-1 ring-slate-600',
  C:    'bg-slate-300 text-slate-700 ring-1 ring-slate-400',
  UDFA: 'bg-red-100 text-red-700 ring-1 ring-red-300',
}

const BADGE_LABELS = {
  SS:   'Generational',
  BC:   'Blue Chip',
  A:    'Early Round',
  B:    'Mid Round',
  C:    'Late Round',
  UDFA: 'UDFA',
}

export function getBadgeStyle(grade) {
  const { tier } = parseGrade(grade)
  return BADGE_STYLES[tier] ?? BADGE_STYLES['UDFA']
}

export function getBadgeTooltip(grade) {
  const { round, tier } = parseGrade(grade)
  const label = BADGE_LABELS[tier] ?? 'Unknown'
  if (tier === 'UDFA') return 'Undrafted Free Agent — not expected to be drafted'
  if (tier === 'SS') return `${grade} — Generational prospect (Once every few years). Round ${round} pick.`
  if (tier === 'BC') return `${grade} — Blue Chip prospect (Perennial All-Pro potential). Round ${round} pick.`
  return `${grade} — ${label} of Round ${round}`
}

export function getPositionPositions() {
  return ['All', 'QB', 'RB', 'WR', 'TE', 'OT', 'IOL', 'EDGE', 'DL', 'LB', 'CB', 'S']
}
