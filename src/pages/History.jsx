import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getHistory } from '../utils/analyzer'
import { AlertCircle } from 'lucide-react'

export default function History() {
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const items = getHistory()
    if (items.length === 0 && localStorage.getItem('jd_history')) {
      setError('One saved entry couldn\'t be loaded. Create a new analysis.')
    }
    setHistory(items)
  }, [])

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (e) {
      return 'Invalid date'
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Analysis History</h2>
      
      {error && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <p className="text-sm text-amber-800">{error}</p>
        </div>
      )}
      
      {history.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-4">No analysis history yet.</p>
          <button
            onClick={() => navigate('/dashboard/analyze')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Analyze Your First JD
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/dashboard/results?id=${item.id}`)}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:border-primary cursor-pointer transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{item.company || 'Unknown Company'}</h3>
                  <p className="text-gray-600 mb-2">{item.role || 'Unknown Role'}</p>
                  <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{item.finalScore || item.readinessScore || item.baseScore || 0}</div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
              </div>
              
              {item.extractedSkills && Object.keys(item.extractedSkills).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.values(item.extractedSkills).flat().slice(0, 6).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                  {Object.values(item.extractedSkills).flat().length > 6 && (
                    <span className="px-2 py-1 text-gray-500 text-xs">
                      +{Object.values(item.extractedSkills).flat().length - 6} more
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
