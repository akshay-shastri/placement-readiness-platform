import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzeJD, saveToHistory } from '../utils/analyzer'
import { AlertCircle } from 'lucide-react'

export default function Analyze() {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jdText, setJdText] = useState('')
  const [warning, setWarning] = useState('')
  const navigate = useNavigate()

  const handleAnalyze = () => {
    if (!jdText.trim()) {
      setWarning('Job description is required.')
      return
    }

    if (jdText.trim().length < 200) {
      setWarning('This JD is too short to analyze deeply. Paste full JD for better output.')
      return
    }

    setWarning('')
    const analysis = analyzeJD(company, role, jdText)
    saveToHistory(analysis)
    localStorage.setItem('latest_analysis', JSON.stringify(analysis))
    navigate('/dashboard/results')
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Analyze Job Description</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Google, Amazon"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer, Frontend Developer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
          <textarea
            value={jdText}
            onChange={(e) => {
              setJdText(e.target.value)
              setWarning('')
            }}
            placeholder="Paste the complete job description here..."
            rows={12}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {warning && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <p className="text-sm text-amber-800">{warning}</p>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Analyze Job Description
        </button>
      </div>
    </div>
  )
}
