import React from 'react'
import GradeBadge from '../components/GradeBadge'

const TIERS = [
  {
    grade:   'SS',
    example: '1SS',
    tier:    'Generational',
    desc:    'Once every few years. A true franchise-altering talent at the very top of the draft.',
    bg:      'bg-amber-50',
    border:  'border-amber-200',
  },
  {
    grade:   'BC',
    example: '1BC',
    tier:    'Blue Chip Prospect',
    desc:    'Perennial All-Pro ceiling. A lock for Day 1 impact and long-term star potential.',
    bg:      'bg-blue-50',
    border:  'border-blue-200',
  },
  {
    grade:   'A',
    example: '2A',
    tier:    'Early in Round',
    desc:    'Top end of the indicated round. High-floor prospect with clear starting ability.',
    bg:      'bg-emerald-50',
    border:  'border-emerald-200',
  },
  {
    grade:   'B',
    example: '3B',
    tier:    'Mid-Round',
    desc:    'Solid value pick in the middle of the indicated round. Reliable contributor.',
    bg:      'bg-slate-50',
    border:  'border-slate-200',
  },
  {
    grade:   'C',
    example: '4C',
    tier:    'Late in Round',
    desc:    'Back-end value in the indicated round. Project player or depth piece.',
    bg:      'bg-slate-50',
    border:  'border-slate-200',
  },
  {
    grade:   'UDFA',
    example: 'UDFA',
    tier:    'Undrafted Free Agent',
    desc:    'Not expected to be drafted. May sign as an undrafted free agent.',
    bg:      'bg-red-50',
    border:  'border-red-200',
  },
]

const EXAMPLES = [
  { grade: '1SS', meaning: 'Generational 1st-round pick' },
  { grade: '1BC', meaning: 'Blue Chip 1st-round pick' },
  { grade: '1A',  meaning: 'Early 1st-round pick' },
  { grade: '2B',  meaning: 'Mid 2nd-round pick' },
  { grade: '3C',  meaning: 'Late 3rd-round pick' },
  { grade: '5A',  meaning: 'Early 5th-round pick' },
  { grade: 'UDFA', meaning: 'Undrafted — no round attached' },
]

export default function GradingScale() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="section-label mb-3">Reference Guide</p>
          <h1 className="font-display text-4xl md:text-5xl font-black text-navy-950 leading-tight mb-3" style={{ fontWeight: 900 }}>
            My Draft Grading Scale
          </h1>
          <p className="text-slate-500 text-base">
            New Tier System — Beginning 2025
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* How it works */}
        <div className="bg-navy-950 rounded-2xl p-7 text-white">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ fontWeight: 700 }}>How It Works</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            My grades combine a <span className="text-blue-400 font-semibold">round number (1–7)</span> with a{' '}
            <span className="text-blue-400 font-semibold">tier indicator</span> to tell you exactly where and how I project a player to be drafted.
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2"><span className="text-blue-400 font-bold mt-0.5">•</span> <span><strong className="text-white">SS</strong> and <strong className="text-white">BC</strong> are reserved exclusively for elite 1st-round prospects</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 font-bold mt-0.5">•</span> <span><strong className="text-white">A</strong> = early in the indicated round, <strong className="text-white">B</strong> = mid-round, <strong className="text-white">C</strong> = late in the indicated round</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-400 font-bold mt-0.5">•</span> <span><strong className="text-white">UDFA</strong> means undraftable — no round number attached</span></li>
          </ul>
        </div>

        {/* Tier table */}
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-950 mb-5" style={{ fontWeight: 700 }}>Tier Breakdown</h2>
          <div className="space-y-3">
            {TIERS.map(t => (
              <div key={t.grade} className={`flex items-center gap-5 ${t.bg} border ${t.border} rounded-xl px-6 py-4`}>
                <div className="w-20 flex-shrink-0">
                  <GradeBadge grade={t.example} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm">{t.tier}</div>
                  <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">{t.desc}</div>
                </div>
                <div className="hidden sm:block text-xs font-mono text-slate-400 bg-white/60 border border-slate-200 rounded px-2 py-1 flex-shrink-0">
                  Indicator: <strong>{t.grade}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick reference */}
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-950 mb-5" style={{ fontWeight: 700 }}>Grade Examples</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="th-cell">Grade</th>
                  <th className="th-cell">What It Means</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EXAMPLES.map(ex => (
                  <tr key={ex.grade} className="hover:bg-slate-50 transition-colors">
                    <td className="td-cell w-32">
                      <GradeBadge grade={ex.grade} />
                    </td>
                    <td className="td-cell text-slate-600">{ex.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4 text-sm text-blue-800">
          <strong>Note:</strong> All grades reflect my personal scouting opinions as a former Division 1 WR. They are not affiliated with any NFL team or official scouting service.
        </div>
      </div>
    </div>
  )
}
