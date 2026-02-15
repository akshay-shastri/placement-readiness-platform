import { useNavigate } from 'react-router-dom'
import { Code, Video, TrendingUp } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <section className="px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Ace Your Placement</h1>
        <p className="text-xl text-gray-600 mb-8">Practice, assess, and prepare for your dream job</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition"
        >
          Get Started
        </button>
      </section>

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <Code className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Practice Problems</h3>
            <p className="text-gray-600">Solve coding challenges to sharpen your skills</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <Video className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mock Interviews</h3>
            <p className="text-gray-600">Practice with realistic interview scenarios</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-8 text-center">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your improvement over time</p>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-gray-600 border-t border-gray-200">
        <p>&copy; 2024 Placement Readiness Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
