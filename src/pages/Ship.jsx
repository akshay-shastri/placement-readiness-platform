import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Rocket, AlertTriangle } from 'lucide-react'
import { getCompletionStatus } from '../utils/completion'

export default function Ship() {
  const [status, setStatus] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    setStatus(getCompletionStatus())
  }, [])

  if (!status.isShipped) {
    return (
      <div className="max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ship</h2>

        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Shipping Locked</h3>
          <p className="text-gray-600 mb-6">
            Complete all requirements before shipping.
          </p>
          
          <div className="space-y-2 mb-6">
            <div className={`flex items-center justify-center gap-2 ${status.allTestsPassed ? 'text-green-600' : 'text-amber-600'}`}>
              {status.allTestsPassed ? '✓' : '○'} Tests: {status.testsPassed || 0} / 10
            </div>
            <div className={`flex items-center justify-center gap-2 ${status.allStepsCompleted ? 'text-green-600' : 'text-amber-600'}`}>
              {status.allStepsCompleted ? '✓' : '○'} Steps: All 8 completed
            </div>
            <div className={`flex items-center justify-center gap-2 ${status.allLinksProvided ? 'text-green-600' : 'text-amber-600'}`}>
              {status.allLinksProvided ? '✓' : '○'} Links: All 3 provided
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/dashboard/test')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:border-primary transition"
            >
              Test Checklist
            </button>
            <button
              onClick={() => navigate('/dashboard/proof')}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Go to Proof
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Ship</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <Rocket className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to Ship! 🚀</h3>
        <p className="text-gray-600 mb-6">
          All tests have passed. Your Placement Readiness Platform is ready for deployment.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-green-800 font-medium mb-2">✓ All 10 tests passed</p>
          <p className="text-sm text-green-700">
            The platform has been validated for core functionality, data persistence, and user experience.
          </p>
        </div>

        <div className="space-y-3 text-left max-w-md mx-auto">
          <h4 className="font-semibold text-gray-900">Next Steps:</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Run <code className="bg-gray-100 px-2 py-0.5 rounded">npm run build</code> to create production build</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Deploy to your hosting platform (Vercel, Netlify, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Share with users and gather feedback</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
