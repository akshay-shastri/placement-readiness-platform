import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import CircularProgress from '../components/CircularProgress'

const skillData = [
  { skill: 'DSA', value: 75 },
  { skill: 'System Design', value: 60 },
  { skill: 'Communication', value: 80 },
  { skill: 'Resume', value: 85 },
  { skill: 'Aptitude', value: 70 },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const activeDays = [true, true, false, true, true, false, false]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Overall Readiness */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-6">Overall Readiness</h3>
          <div className="flex justify-center">
            <CircularProgress value={72} max={100} />
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-6">Skill Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
              <Radar dataKey="value" stroke="hsl(245, 58%, 51%)" fill="hsl(245, 58%, 51%)" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Continue Practice */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-4">Continue Practice</h3>
          <p className="text-gray-700 mb-2 font-medium">Dynamic Programming</p>
          <p className="text-sm text-gray-500 mb-3">3/10 completed</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition">
            Continue
          </button>
        </div>

        {/* Weekly Goals */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold mb-4">Weekly Goals</h3>
          <p className="text-gray-700 mb-2">Problems Solved: 12/20 this week</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="flex gap-2 justify-center">
            {days.map((day, idx) => (
              <div key={day} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium ${
                  activeDays[idx] ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {day[0]}
                </div>
                <span className="text-xs text-gray-500">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assessments */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Upcoming Assessments</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">DSA Mock Test</p>
                <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">System Design Review</p>
                <p className="text-sm text-gray-500">Wed, 2:00 PM</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">HR Interview Prep</p>
                <p className="text-sm text-gray-500">Friday, 11:00 AM</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
