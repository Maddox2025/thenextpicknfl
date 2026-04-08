import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-navy-700 flex items-center justify-center text-base leading-none">
              🏈
            </div>
            <div>
              <div className="font-display font-bold text-white text-base leading-none tracking-tight" style={{ fontWeight: 800 }}>
                THE NEXT PICK NFL
              </div>
              <div className="text-[10px] text-blue-400 tracking-widest uppercase mt-0.5">
                Expert Draft Analysis
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Rankings</Link>
            <Link to="/grading" className="hover:text-white transition-colors">Grading Scale</Link>
            <Link to="/mock-drafts" className="hover:text-white transition-colors">Mock Drafts</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
          </div>

          {/* X link */}
          <a
            href="https://x.com/TheNextPickNFL"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @TheNextPickNFL
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-navy-800 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} The Next Pick NFL. All rights reserved. For entertainment purposes only.
        </div>
      </div>
    </footer>
  )
}
