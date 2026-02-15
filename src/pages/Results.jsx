import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getHistoryItem, updateHistoryItem } from '../utils/analyzer'
import { Download, Copy, Check, Building2, Users, Target } from 'lucide-react'

export default function Results() {
  const [searchParams] = useSearchParams()
  const [analysis, setAnalysis] = useState(null)
  const [skillConfidence, setSkillConfidence] = useState({})
  const [liveScore, setLiveScore] = useState(0)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const historyId = searchParams.get('id')
    
    if (historyId) {
      const item = getHistoryItem(historyId)
      if (item) {
        setAnalysis(item)
        setSkillConfidence(item.skillConfidenceMap || {})
        setLiveScore(item.finalScore || item.readinessScore || item.baseScore || 0)
      }
    } else {
      const latest = localStorage.getItem('latest_analysis')
      if (latest) {
        try {
          const parsed = JSON.parse(latest)
          setAnalysis(parsed)
          setSkillConfidence(parsed.skillConfidenceMap || {})
          setLiveScore(parsed.finalScore || parsed.readinessScore || parsed.baseScore || 0)
        } catch (e) {
          console.error('Failed to parse latest analysis')
        }
      }
    }
  }, [searchParams])

  const toggleSkill = (skill) => {
    const current = skillConfidence[skill] || 'practice'
    const newValue = current === 'practice' ? 'know' : 'practice'
    const newConfidence = { ...skillConfidence, [skill]: newValue }
    
    setSkillConfidence(newConfidence)
    
    // Calculate new score from base
    const allSkills = Object.values(analysis.extractedSkills).flat()
    let newScore = analysis.baseScore || analysis.readinessScore
    
    allSkills.forEach(s => {
      const conf = newConfidence[s] || 'practice'
      if (conf === 'know') newScore += 2
      else newScore -= 2
    })
    
    newScore = Math.max(0, Math.min(100, newScore))
    setLiveScore(newScore)
    
    // Update history with new finalScore and updatedAt
    const updated = { 
      ...analysis, 
      skillConfidenceMap: newConfidence, 
      finalScore: newScore,
      readinessScore: newScore,
      updatedAt: new Date().toISOString()
    }
    setAnalysis(updated)
    updateHistoryItem(updated)
    localStorage.setItem('latest_analysis', JSON.stringify(updated))
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const copy7DayPlan = () => {
    const text = analysis.plan.map(d => `${d.day}: ${d.title}\n${d.tasks.map(t => `  • ${t}`).join('\n')}`).join('\n\n')
    copyToClipboard(text, '7day')
  }

  const copyChecklist = () => {
    const text = analysis.checklist.map(r => `${r.title}\n${r.items.map(i => `  • ${i}`).join('\n')}`).join('\n\n')
    copyToClipboard(text, 'checklist')
  }

  const copyQuestions = () => {
    const text = analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')
    copyToClipboard(text, 'questions')
  }

  const downloadTXT = () => {
    const content = `${analysis.company} - ${analysis.role}\nReadiness Score: ${liveScore}\n\n` +
      `KEY SKILLS\n${Object.entries(analysis.extractedSkills).map(([cat, skills]) => `${cat}: ${skills.join(', ')}`).join('\n')}\n\n` +
      `ROUND-WISE CHECKLIST\n${analysis.checklist.map(r => `${r.title}\n${r.items.map(i => `  • ${i}`).join('\n')}`).join('\n\n')}\n\n` +
      `7-DAY PLAN\n${analysis.plan.map(d => `${d.day}: ${d.title}\n${d.tasks.map(t => `  • ${t}`).join('\n')}`).join('\n\n')}\n\n` +
      `INTERVIEW QUESTIONS\n${analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${analysis.company}_${analysis.role}_prep.txt`.replace(/\s+/g, '_')
    a.click()
  }

  if (!analysis) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No analysis found. Please analyze a job description first.</p>
      </div>
    )
  }

  const categoryNames = {
    coreCS: 'Core CS',
    languages: 'Languages',
    web: 'Web Technologies',
    data: 'Databases',
    cloud: 'Cloud & DevOps',
    testing: 'Testing'
  }

  const weakSkills = Object.values(analysis.extractedSkills).flat().filter(s => (skillConfidence[s] || 'practice') === 'practice').slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{analysis.company}</h2>
          <p className="text-gray-600">{analysis.role}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-primary transition-all">{liveScore}</div>
          <div className="text-sm text-gray-500">Readiness Score</div>
        </div>
      </div>

      {/* Company Intel */}
      {analysis.companyIntel && analysis.company !== 'Unknown Company' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-4">Company Intel</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="font-medium text-gray-900">{analysis.companyIntel.industry}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Company Size</p>
                <p className="font-medium text-gray-900">{analysis.companyIntel.size}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-gray-500">Hiring Focus</p>
                <p className="font-medium text-gray-900">Structured</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Typical Hiring Focus</p>
            <p className="text-sm text-gray-600">{analysis.companyIntel.hiringFocus}</p>
          </div>
          <p className="text-xs text-gray-400 mt-3">Demo Mode: Company intel generated heuristically.</p>
        </div>
      )}

      {/* Round Mapping */}
      {analysis.roundMapping && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-4">Interview Round Mapping</h3>
          <div className="space-y-4">
            {analysis.roundMapping.map((round, idx) => (
              <div key={idx} className="relative pl-8 pb-4 border-l-2 border-primary last:border-l-0 last:pb-0">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{round.round}</h4>
                  <p className="text-sm text-gray-700 mb-2">{round.description}</p>
                  <p className="text-xs text-gray-500 italic">Why: {round.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-3">
        <button onClick={copy7DayPlan} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition">
          {copied === '7day' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy 7-day plan
        </button>
        <button onClick={copyChecklist} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition">
          {copied === 'checklist' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy round checklist
        </button>
        <button onClick={copyQuestions} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-primary transition">
          {copied === 'questions' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          Copy 10 questions
        </button>
        <button onClick={downloadTXT} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition">
          <Download className="w-4 h-4" />
          Download as TXT
        </button>
      </div>

      {/* Extracted Skills */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Key Skills Extracted</h3>
        {Object.keys(analysis.extractedSkills).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
              <div key={category}>
                <p className="text-sm font-medium text-gray-700 mb-2">{categoryNames[category]}</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => {
                    const conf = skillConfidence[skill] || 'practice'
                    return (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1 rounded-full text-sm transition cursor-pointer ${
                          conf === 'know' 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {skill} {conf === 'know' ? '✓' : '○'}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">General fresher stack</p>
        )}
        <p className="text-xs text-gray-500 mt-4">Click skills to toggle: ✓ I know this | ○ Need practice</p>
      </div>

      {/* Round-wise Checklist */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Round-wise Preparation Checklist</h3>
        <div className="space-y-6">
          {analysis.checklist.map((round, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-gray-900 mb-2">{round.title}</h4>
              <ul className="space-y-1">
                {round.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Plan */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">7-Day Preparation Plan</h3>
        <div className="space-y-4">
          {analysis.plan.map((day, idx) => (
            <div key={idx} className="border-l-4 border-primary pl-4">
              <div className="font-semibold text-gray-900">{day.day}: {day.title}</div>
              <ul className="mt-2 space-y-1">
                {day.tasks.map((task, i) => (
                  <li key={i} className="text-sm text-gray-700">• {task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Questions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">10 Likely Interview Questions</h3>
        <ol className="space-y-3">
          {analysis.questions.map((question, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="font-semibold text-primary">{idx + 1}.</span>
              <span className="text-gray-700">{question}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Action Next */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Action Next</h3>
        {weakSkills.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Focus on these skills:</p>
            <div className="flex flex-wrap gap-2">
              {weakSkills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        <p className="text-gray-700 font-medium">Start Day 1 plan now.</p>
      </div>
    </div>
  )
}
