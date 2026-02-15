export default function CircularProgress({ value, max }) {
  const percentage = (value / max) * 100
  const circumference = 2 * Math.PI * 70
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="transform -rotate-90 w-48 h-48">
          <circle cx="96" cy="96" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
          <circle 
            cx="96" 
            cy="96" 
            r="70" 
            stroke="hsl(245, 58%, 51%)" 
            strokeWidth="12" 
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{value}</span>
          <span className="text-sm text-gray-500">/ {max}</span>
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Readiness Score</p>
    </div>
  )
}
