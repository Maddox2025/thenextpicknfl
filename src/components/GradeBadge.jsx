import React, { useState } from 'react'
import { getBadgeStyle, getBadgeTooltip } from '../gradeUtils'

export default function GradeBadge({ grade }) {
  const [showTip, setShowTip] = useState(false)

  if (!grade) return null

  return (
    <div className="relative inline-block">
      <span
        className={`grade-badge ${getBadgeStyle(grade)}`}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        role="img"
        aria-label={getBadgeTooltip(grade)}
      >
        {grade.toUpperCase()}
      </span>

      {showTip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 text-xs bg-navy-950 text-white rounded-lg px-3 py-2 shadow-xl leading-snug pointer-events-none">
          {getBadgeTooltip(grade)}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy-950" />
        </div>
      )}
    </div>
  )
}
