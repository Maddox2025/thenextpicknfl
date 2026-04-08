import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/',            label: 'Rankings'     },
    { to: '/grading',     label: 'Grading Scale' },
    { to: '/mock-drafts', label: 'Mock Drafts'  },
    { to: '/about',       label: 'About Me'     },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-lg leading-none select-none">
              🏈
            </div>
            <div className="leading-tight">
              <div className="font-display font-800 text-navy-900 text-lg leading-none tracking-tight" style={{ fontWeight: 800 }}>
                THE NEXT PICK
              </div>
              <div className="font-display text-[10px] font-semibold text-blue-500 tracking-[0.18em] uppercase leading-none mt-0.5">
                NFL Draft Analysis
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `nav-link pb-0.5 ${isActive ? 'active' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://x.com/TheNextPickNFL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-navy-800 transition-colors border border-slate-200 hover:border-navy-300 rounded-full px-3 py-1.5"
            >
              <XIcon />
              @TheNextPickNFL
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-slate-500 hover:text-navy-800 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <XClose /> : <Hamburger />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 pb-4 pt-2 space-y-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-navy-50 text-navy-800'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-navy-800'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://x.com/TheNextPickNFL"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-500 hover:text-navy-800"
              onClick={() => setMenuOpen(false)}
            >
              <XIcon /> @TheNextPickNFL
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function Hamburger() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XClose() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
