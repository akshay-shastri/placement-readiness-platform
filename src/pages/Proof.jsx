import { useState, useEffect } from 'react'
import { CheckCircle2, Circle, Copy, Check, AlertCircle } from 'lucide-react'
import { getStepCompletion, saveStepCompletion, getCompletionStatus } from '../utils/completion'

const STEPS = [
  { id: 'requirements', label: 'Requirements Definition' },
  { id: 'design', label: 'Design System Setup' },
  { id: 'implementation', label: 'Core Implementation' },
  { id: 'features', label: 'Feature Development' },
  { id: 'validation', label: 'Data Validation' },
  { id: 'testing', label: 'Testing & QA' },
  { id: 'proof', label: 'Proof Documentation' },
  { id: 'deployment', label: 'Deployment' }
]

export default function Proof() {
  const [steps, setSteps] = useState({})
  const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' })
  const [errors, setErrors] = useState({})
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState({})

  useEffect(() => {
    setSteps(getStepCompletion())
    
    const stored = localStorage.getItem('prp_final_submission')
    if (stored) {
      setLinks(JSON.parse(stored))
    }

    setStatus(getCompletionStatus())
  }, [])

  const toggleStep = (id) => {
    const updated = { ...steps, [id]: !steps[id] }
    setSteps(updated)
    saveStepCompletion(updated)
    setStatus(getCompletionStatus())
  }

  const validateURL = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleLinkChange = (field, value) => {
    setLinks({ ...links, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const saveLinks = () => {
    const newErrors = {}
    
    if (!links.lovable || !validateURL(links.lovable)) {
      newErrors.lovable = 'Valid URL required'
    }
    if (!links.github || !validateURL(links.github)) {
      newErrors.github = 'Valid URL required'
    }
    if (!links.deployed || !validateURL(links.deployed)) {
      newErrors.deployed = 'Valid URL required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    localStorage.setItem('prp_final_submission', JSON.stringify(links))
    setStatus(getCompletionStatus())
    alert('Links saved successfully!')
  }

  const copySubmission = () => {
    const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const completedSteps = Object.values(steps).filter(Boolean).length

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Proof of Work</h2>

      {/* Status Banner */}
      {status.isShipped && (
        <div className="bg-primary/10 border border-primary rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold text-primary mb-2">🎉 Shipped</h3>
          <p className="text-gray-700 leading-relaxed">
            You built a real product.<br />
            Not a tutorial. Not a clone.<br />
            A structured tool that solves a real problem.<br /><br />
            <strong>This is your proof of work.</strong>
          </p>
        </div>
      )}

      {/* Step Completion Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Step Completion Overview</h3>
        <p className="text-sm text-gray-600 mb-4">Completed: {completedSteps} / {STEPS.length}</p>
        
        <div className="space-y-3">
          {STEPS.map((step) => (
            <label key={step.id} className="flex items-center gap-3 cursor-pointer group">
              <div onClick={() => toggleStep(step.id)}>
                {steps[step.id] ? (
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 group-hover:text-gray-400" />
                )}
              </div>
              <span className={`font-medium ${steps[step.id] ? 'text-gray-900 line-through' : 'text-gray-900'}`}>
                {step.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Artifact Inputs */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Artifact Links (Required for Ship Status)</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lovable Project Link *
            </label>
            <input
              type="url"
              value={links.lovable}
              onChange={(e) => handleLinkChange('lovable', e.target.value)}
              placeholder="https://lovable.dev/projects/..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.lovable ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lovable && (
              <p className="text-sm text-red-600 mt-1">{errors.lovable}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Repository Link *
            </label>
            <input
              type="url"
              value={links.github}
              onChange={(e) => handleLinkChange('github', e.target.value)}
              placeholder="https://github.com/username/repo"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.github ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.github && (
              <p className="text-sm text-red-600 mt-1">{errors.github}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deployed URL *
            </label>
            <input
              type="url"
              value={links.deployed}
              onChange={(e) => handleLinkChange('deployed', e.target.value)}
              placeholder="https://your-app.vercel.app"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.deployed ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.deployed && (
              <p className="text-sm text-red-600 mt-1">{errors.deployed}</p>
            )}
          </div>

          <button
            onClick={saveLinks}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Save Links
          </button>
        </div>
      </div>

      {/* Final Submission Export */}
      {status.allLinksProvided && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-4">Final Submission</h3>
          <button
            onClick={copySubmission}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Copy Final Submission'}
          </button>
        </div>
      )}

      {/* Status Warning */}
      {!status.isShipped && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mt-6">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Not ready to ship yet:</p>
            <ul className="list-disc list-inside space-y-1">
              {!status.allStepsCompleted && <li>Complete all 8 steps</li>}
              {!status.allTestsPassed && <li>Pass all 10 test checklist items</li>}
              {!status.allLinksProvided && <li>Provide all 3 artifact links</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
