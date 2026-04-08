import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Rankings from './pages/Rankings'
import GradingScale from './pages/GradingScale'
import MockDrafts from './pages/MockDrafts'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"            element={<Rankings />}     />
            <Route path="/grading"     element={<GradingScale />} />
            <Route path="/mock-drafts" element={<MockDrafts />}   />
            <Route path="/about"       element={<About />}        />
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
                <div className="text-6xl">🏈</div>
                <h1 className="font-display text-4xl font-black text-navy-950" style={{ fontWeight: 900 }}>
                  Page Not Found
                </h1>
                <p className="text-slate-500 text-sm max-w-xs">
                  That route does not exist. Head back to the rankings.
                </p>
                <a href="/" className="mt-2 inline-flex items-center gap-2 bg-navy-900 text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-navy-800 transition-colors">
                  Back to Rankings
                </a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
