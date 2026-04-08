import React, { useEffect, useState, useMemo } from 'react'
import { fetchSheet } from '../sheets'
import GradeBadge from '../components/GradeBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function MockDrafts() {
  const [allPicks, setAllPicks]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [selectedDate, setSelected] = useState('')

  useEffect(() => {
    fetchSheet('MockDrafts')
      .then(data => {
        setAllPicks(data)
        // Default to the most recent mock draft version
        const dates = [...new Set(data.map(r => r.MockDate).filter(Boolean))].sort().reverse()
        if (dates.length) setSelected(dates[0])
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const versions = useMemo(() => {
    const dates = [...new Set(allPicks.map(r => r.MockDate).filter(Boolean))].sort().reverse()
    return dates
  }, [allPicks])

  const picks = useMemo(() => {
    if (!selectedDate) return []
    return allPicks
      .filter(r => r.MockDate === selectedDate)
      .sort((a, b) => (parseInt(a.PickNumber, 10) || 0) - (parseInt(b.PickNumber, 10) || 0))
  }, [allPicks, selectedDate])

  function formatDate(raw) {
    if (!raw) return raw
    const d = new Date(raw)
    if (isNaN(d.getTime())) return raw
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="section-label mb-3">My Mock Drafts</p>
          <h1 className="font-display text-4xl md:text-5xl font-black text-navy-950 leading-tight" style={{ fontWeight: 900 }}>
            Mock Draft Board
          </h1>
          <p className="text-slate-500 text-sm mt-2">Updated as the draft approaches. Each version is preserved for reference.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {loading && <LoadingSpinner message="Loading mock drafts..." />}
        {error   && <ErrorMessage message={error} />}

        {!loading && !error && versions.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-sm">No mock drafts published yet. Check back soon!</p>
          </div>
        )}

        {!loading && !error && versions.length > 0 && (
          <>
            {/* Version selector */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Select Version</p>
                  <div className="flex flex-wrap gap-2">
                    {versions.map(v => (
                      <button
                        key={v}
                        onClick={() => setSelected(v)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                          selectedDate === v
                            ? 'bg-navy-800 text-white border-navy-800 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-navy-400 hover:text-navy-700'
                        }`}
                      >
                        {formatDate(v)}
                        {v === versions[0] && (
                          <span className="ml-2 text-[10px] font-bold tracking-wide text-blue-400 uppercase">Latest</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedDate && (
                  <div className="sm:ml-auto text-right">
                    <p className="text-xs text-slate-400">Picks in this mock</p>
                    <p className="text-2xl font-display font-black text-navy-900" style={{ fontWeight: 900 }}>{picks.length}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mock draft table */}
            {selectedDate && (
              <>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h2 className="font-display text-xl font-bold text-navy-950" style={{ fontWeight: 700 }}>
                    {formatDate(selectedDate)} Mock Draft
                  </h2>
                  <span className="text-xs text-slate-400">{picks.length} picks</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="th-cell w-16 text-center">Pick</th>
                          <th className="th-cell">Team</th>
                          <th className="th-cell">Player</th>
                          <th className="th-cell">Pos</th>
                          <th className="th-cell">School</th>
                          <th className="th-cell">Why This Pick</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {picks.map((pick, idx) => (
                          <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                            <td className="td-cell text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy-900 text-white text-xs font-bold font-mono">
                                {pick.PickNumber}
                              </span>
                            </td>
                            <td className="td-cell">
                              <span className="font-semibold text-slate-800 text-sm">{pick.Team}</span>
                            </td>
                            <td className="td-cell">
                              <span className="font-semibold text-slate-900">{pick.PlayerName}</span>
                            </td>
                            <td className="td-cell">
                              <span className="inline-block bg-navy-50 text-navy-700 text-xs font-bold px-2 py-0.5 rounded border border-navy-100">
                                {pick.Position}
                              </span>
                            </td>
                            <td className="td-cell text-slate-500 text-sm">{pick.School}</td>
                            <td className="td-cell text-slate-500 text-xs leading-relaxed max-w-xs">
                              {pick.Summary || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
