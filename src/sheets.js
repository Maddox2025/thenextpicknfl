// sheets.js
// Fetches data from a publicly shared Google Sheet via CSV export.
// Set VITE_SHEET_ID in your .env file (and in Vercel environment variables).
// The sheet must be shared as "Anyone with the link can view".

const SHEET_ID = import.meta.env.VITE_SHEET_ID

/**
 * Fetch a tab from the Google Sheet by its visible tab name (gid not needed —
 * we use the sheet name in the export URL which works for public sheets).
 * Returns an array of objects keyed by the first-row headers.
 */
export async function fetchSheet(tabName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch sheet "${tabName}": ${res.status}`)

  const text = await res.text()
  return parseCSV(text)
}

/**
 * Minimal CSV parser that handles quoted fields (including commas inside quotes).
 */
function parseCSV(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []

  const headers = parseLine(lines[0]).map(h => h.trim())

  return lines.slice(1).map(line => {
    const values = parseLine(line)
    const row = {}
    headers.forEach((h, i) => {
      row[h] = (values[i] ?? '').trim()
    })
    return row
  }).filter(row => Object.values(row).some(v => v !== ''))
}

function parseLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}
