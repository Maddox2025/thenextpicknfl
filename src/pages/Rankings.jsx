import React, { useEffect, useState, useMemo } from 'react'
import { fetchSheet } from '../sheets'
import GradeBadge from '../components/GradeBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { gradeSort, getPositionPositions } from '../gradeUtils'

const POSITIONS = getPositionPositions()

const SORT_KEYS = {
  overall:  'OverallRank',
  grade:    'Grade',
  posRank:  'PositionRank',
  name:     'PlayerName',
  school:   'School',
  position: 'Position',
}

export default function Rankings() {
  const [players, setPlayers]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [search, setSearch]       = useState('')
  const [posFilter, setPosFilter] = useState('All')
  const [sortKey, setSortKey]     = useState('overall')
  const [sortDir, setSortDir]     = useState('asc')

  useEffect(() => {
    fetchSheet('PlayerRankings')
      .then(setPlayers)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = useMemo(() => {
    let rows = [...players]

    if (posFilter !== 'All') {
      rows = rows.filter(p => (p.Position || '').toUpperCase() === posFilter)
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(p =>
        (p.PlayerName || '').toLowerCase().includes(q) ||
        (p.School || '').toLowerCase().includes(q) ||
        (p.Position || '').toLowerCase().includes(q)
      )
    }

    rows.sort((a, b) => {
      let cmp = 0
      if (sortKey === 'grade') {
        cmp = gradeSort(a.Grade, b.Grade)
      } else if (sortKey === 'overall') {
        const ra = parseInt(a.OverallRank, 10) || 9999
        const rb = parseInt(b.OverallRank, 10) || 9999
        cmp = ra - rb
      } else if (sortKey === 'posRank') {
        const ra = parseInt(a.PositionRank, 10) || 9999
        const rb = parseInt(b.PositionRank, 10) || 9999
        cmp = ra - rb
      } else {
        const col = SORT_KEYS[sortKey]
        cmp = (a[col] || '').localeCompare(b[col] || '')
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return rows
  }, [players, posFilter, search, sortKey, sortDir])

  // Stats bar counts
  const statCounts = useMemo(() => {
    const total = players.length
    const firstRound = players.filter(p => {
      const g = (p.Grade || '').toUpperCase()
      return g.startsWith('1')
    }).length
    const byPos = {}
    players.forEach(p => {
      const pos = (p.Position || '').toUpperCase()
      if (pos) byPos[pos] = (byPos[pos] || 0) + 1
    })
    return { total, firstRound, byPos }
  }, [players])

  function SortIcon({ col }) {
    if (sortKey !== col) return <span className="ml-1 opacity-30">↕</span>
    return <span className="ml-1 text-navy-700">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="relative bg-navy-950 overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-xs font-semibold tracking-wide uppercase">2025 NFL Draft</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-black text-white leading-none tracking-tight mb-4" style={{ fontWeight: 900 }}>
              THE NEXT PICK NFL
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-2">
              Expert NFL Draft Analysis by a <span className="text-blue-400 font-semibold">Former Division 1 WR</span>
            </p>
            <p className="text-slate-500 text-sm">
              Follow on X{' '}
              <a href="https://x.com/TheNextPickNFL" target="_blank" rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                @TheNextPickNFL
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {loading && <LoadingSpinner message="Loading player rankings..." />}
        {error   && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            {/* Stats bar */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="stat-pill">
                <span className="text-navy-700 font-bold">{statCounts.total}</span>
                Prospects Graded
              </span>
              <span className="stat-pill">
                <span className="text-amber-600 font-bold">{statCounts.firstRound}</span>
                1st-Round Grades
              </span>
              {Object.entries(statCounts.byPos)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([pos, cnt]) => (
                  <span key={pos} className="stat-pill">
                    <span className="font-bold text-navy-700">{cnt}</span> {pos}
                  </span>
                ))}
            </div>

            {/* Search + Filters */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                {/* Search */}
                <div className="relative flex-1">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search player, school, position..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-navy-300 focus:border-navy-400 transition-all"
                  />
                </div>

                {/* Clear */}
                {(search || posFilter !== 'All') && (
                  <button
                    onClick={() => { setSearch(''); setPosFilter('All') }}
                    className="px-4 py-2.5 text-xs font-medium text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Position pills */}
              <div className="flex flex-wrap gap-2">
                {POSITIONS.map(pos => (
                  <button
                    key={pos}
                    onClick={() => setPosFilter(pos)}
                    className={`filter-pill ${posFilter === pos ? 'filter-pill-active' : 'filter-pill-inactive'}`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Result count */}
            <div className="flex items-center justify-between mb-3 px-1">
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of {statCounts.total} prospects
                {posFilter !== 'All' && <span> · <span className="font-medium text-navy-700">{posFilter}</span></span>}
              </p>
              <p className="text-xs text-slate-400">Hover a grade badge for details</p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="rankings-table w-full min-w-[700px]">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="th-cell w-12 text-center">#</th>
                      <th className="th-cell sortable" onClick={() => handleSort('name')}>
                        Player <SortIcon col="name" />
                      </th>
                      <th className="th-cell sortable" onClick={() => handleSort('school')}>
                        School <SortIcon col="school" />
                      </th>
                      <th className="th-cell sortable" onClick={() => handleSort('position')}>
                        Pos <SortIcon col="position" />
                      </th>
                      <th className="th-cell sortable" onClick={() => handleSort('grade')}>
                        Grade <SortIcon col="grade" />
                      </th>
                      <th className="th-cell sortable" onClick={() => handleSort('posRank')}>
                        Pos Rank <SortIcon col="posRank" />
                      </th>
                      <th className="th-cell">Summary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="td-cell text-center text-slate-400 py-16">
                          No prospects match your filters.
                        </td>
                      </tr>
                    ) : (
                      filtered.map((player, idx) => (
                        <tr key={`${player.PlayerName}-${idx}`} className="hover:bg-blue-50/40 transition-colors">
                          <td className="td-cell text-center font-mono text-xs text-slate-400 font-medium">
                            {player.OverallRank || idx + 1}
                          </td>
                          <td className="td-cell">
                            <span className="font-semibold text-slate-900">{player.PlayerName}</span>
                          </td>
                          <td className="td-cell text-slate-500">{player.School}</td>
                          <td className="td-cell">
                            <span className="inline-block bg-navy-50 text-navy-700 text-xs font-bold px-2 py-0.5 rounded border border-navy-100">
                              {player.Position}
                            </span>
                          </td>
                          <td className="td-cell">
                            <GradeBadge grade={player.Grade} />
                          </td>
                          <td className="td-cell font-mono text-xs text-slate-600">
                            {player.PositionRank ? `#${player.PositionRank} ${player.Position}` : '—'}
                          </td>
                          <td className="td-cell text-slate-500 max-w-xs text-xs leading-relaxed">
                            {player.Summary || '—'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
