import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, AlertTriangle, RotateCcw } from 'lucide-react'

const TEST_ITEMS = [
  {
    id: 'jd-required',
    label: 'JD required validation works',
    hint: 'Go to Analyze, leave JD empty, click Analyze. Should show error.'
  },
  {
    id: 'short-jd-warning',
    label: 'Short JD warning shows for <200 chars',
    hint: 'Enter JD with <200 chars. Should show warning about short JD.'
  },
  {
    id: 'skills-extraction',
    label: 'Skills extraction groups correctly',
    hint: 'Analyze JD with "Java, React, SQL". Check Results shows skills grouped by category.'
  },
  {
    id: 'round-mapping',
    label: 'Round mapping changes based on company + skills',
    hint: 'Test with "Amazon" vs "StartupXYZ". Round mapping should differ.'
  },
  {
    id: 'score-deterministic',
    label: 'Score calculation is deterministic',
    hint: 'Analyze same JD twice. Base score should be identical.'
  },
  {
    id: 'skill-toggles',
    label: 'Skill toggles update score live',
    hint: 'On Results, click skill tags. Score should update immediately.'
  },
  {
    id: 'persist-refresh',
    label: 'Changes persist after refresh',
    hint: 'Toggle skills, refresh page. Toggles and score should remain.'
  },
  {
    id: 'history-works',
    label: 'History saves and loads correctly',
    hint: 'Analyze JD, go to History, click entry. Should load same analysis.'
  },
  {
    id: 'export-buttons',
    label: 'Export buttons copy the correct content',
    hint: 'Click "Copy 7-day plan" and paste. Content should match displayed plan.'
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on core pages',
    hint: 'Open DevTools Console. Navigate all pages. Should see no errors.'
  }
]

export default function TestChecklist() {
  const [checklist, setChecklist] = useState({})

  useEffect(() => {
    const stored = localStorage.getItem('prp_test_checklist')
    if (stored) {
      setChecklist(JSON.parse(stored))
    }
  }, [])

  const toggleItem = (id) => {
    const updated = { ...checklist, [id]: !checklist[id] }
    setChecklist(updated)
    localStorage.setItem('prp_test_checklist', JSON.stringify(updated))
  }

  const resetChecklist = () => {
    setChecklist({})
    localStorage.removeItem('prp_test_checklist')
  }

  const passedCount = Object.values(checklist).filter(Boolean).length
  const allPassed = passedCount === TEST_ITEMS.length

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Test Checklist</h2>

      {/* Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              Tests Passed: {passedCount} / {TEST_ITEMS.length}
            </p>
            {!allPassed && (
              <div className="flex items-center gap-2 mt-2 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                <p className="text-sm font-medium">Fix issues before shipping.</p>
              </div>
            )}
            {allPassed && (
              <p className="text-sm text-green-600 mt-2 font-medium">✓ All tests passed! Ready to ship.</p>
            )}
          </div>
          <button
            onClick={resetChecklist}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset checklist
          </button>
        </div>
      </div>

      {/* Test Items */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Test Items</h3>
        <div className="space-y-4">
          {TEST_ITEMS.map((item) => (
            <div key={item.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5">
                  {checklist[item.id] ? (
                    <CheckCircle2 
                      className="w-6 h-6 text-primary" 
                      onClick={() => toggleItem(item.id)}
                    />
                  ) : (
                    <Circle 
                      className="w-6 h-6 text-gray-300 group-hover:text-gray-400" 
                      onClick={() => toggleItem(item.id)}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${checklist[item.id] ? 'text-gray-900 line-through' : 'text-gray-900'}`}>
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">How to test:</span> {item.hint}
                  </p>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
