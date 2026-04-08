import React from 'react'

export default function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="text-3xl">⚠️</div>
      <p className="text-slate-600 text-sm max-w-sm">
        {message || 'Something went wrong loading data. Make sure the Google Sheet is shared publicly and the tab name matches exactly.'}
      </p>
    </div>
  )
}
