import React from 'react'

const EXPERIENCES = [
  '5 years as a Division 1 WR (Started Multiple Games)',
  '2-0 on College GameDay',
  'Beat multiple Top 25 teams',
  'Conference Championship Games',
  '2x Bowl Champion',
  'Played on 3 special teams',
]

const WHAT_I_BRING = [
  {
    icon: '🏈',
    title: 'Player-Level Perspective',
    desc: 'Having played at the D1 level, I understand route technique, leverage, separation, and the physicality that translates to the NFL — things that only show up when you know what to look for.',
  },
  {
    icon: '📊',
    title: 'Film-First Approach',
    desc: 'Grades are built on film study, not hype. I watch full games, not just highlight reels. Stats inform — they never define.',
  },
  {
    icon: '🎯',
    title: 'Honest Evaluations',
    desc: 'No agenda. No recency bias. No bandwagon takes. Just clear, consistent grades using my published tier system from Day 1.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-navy-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, rgba(96,128,255,0.5) 0%, transparent 60%)`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="section-label text-blue-400 mb-4">The Analyst</p>
          <h1 className="font-display text-4xl md:text-5xl font-black leading-tight mb-3" style={{ fontWeight: 900 }}>
            Former Division 1 WR
          </h1>
          <h2 className="font-display text-2xl md:text-3xl text-blue-300 font-bold mb-4" style={{ fontWeight: 700 }}>
            Big Draft Guy (I Wasn't Good Enough)
          </h2>
          <div className="flex items-center gap-3">
            <a
              href="https://x.com/TheNextPickNFL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-full px-4 py-2 text-sm font-semibold"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @TheNextPickNFL
            </a>
            <span className="text-slate-500 text-sm">Joined December 2024</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Playing experience */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h2 className="font-display text-2xl font-bold text-navy-950 mb-6" style={{ fontWeight: 700 }}>
            Playing Experience
          </h2>
          <div className="space-y-3">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-navy-900 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium text-sm">{exp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What I bring */}
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-950 mb-6" style={{ fontWeight: 700 }}>
            What I Bring to Draft Analysis
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {WHAT_I_BRING.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-navy-900 text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-navy-50 border border-navy-100 rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-navy-950 mb-4" style={{ fontWeight: 700 }}>
            Why The Next Pick NFL?
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            I started this platform in December 2024 because I wanted to bring a player's perspective to draft coverage. 
            Most draft analysts never played the game at a high level. I did — and while I wasn't good enough to make it to the next level,
            that experience gave me a lens on evaluating prospects that you can't get from a stat sheet.
          </p>
          <p className="text-slate-600 leading-relaxed">
            My grading system is transparent, consistent, and explained publicly. Every grade you see is backed by film work 
            and my published tier methodology — no mystery grades, no narrative-driven rankings. Just honest evaluation.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center py-6">
          <p className="text-slate-500 text-sm mb-4">Follow along for rankings, mock drafts, and film breakdowns</p>
          <a
            href="https://x.com/TheNextPickNFL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 transition-colors text-white rounded-full px-6 py-3 text-sm font-semibold shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Follow @TheNextPickNFL on X
          </a>
        </div>

      </div>
    </div>
  )
}
