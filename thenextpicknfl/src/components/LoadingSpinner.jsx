import React from 'react'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-navy-100 border-t-navy-700 animate-spin" />
      <p className="text-sm text-slate-500 font-medium">{message}</p>
    </div>
  )
}
