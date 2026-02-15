import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Code, FileText, BookOpen, User, Search, History, CheckSquare, Award, Rocket } from 'lucide-react'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Placement Prep</h2>
        </div>
        <nav className="px-4 space-y-2">
          <NavLink to="/dashboard" end className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/dashboard/practice" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Code className="w-5 h-5" />
            <span>Practice</span>
          </NavLink>
          <NavLink to="/dashboard/assessments" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <FileText className="w-5 h-5" />
            <span>Assessments</span>
          </NavLink>
          <NavLink to="/dashboard/resources" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <BookOpen className="w-5 h-5" />
            <span>Resources</span>
          </NavLink>
          <NavLink to="/dashboard/profile" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <User className="w-5 h-5" />
            <span>Profile</span>
          </NavLink>
          <NavLink to="/dashboard/analyze" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Search className="w-5 h-5" />
            <span>Analyze JD</span>
          </NavLink>
          <NavLink to="/dashboard/history" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <History className="w-5 h-5" />
            <span>History</span>
          </NavLink>
          <div className="border-t border-gray-200 my-2"></div>
          <NavLink to="/dashboard/test" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <CheckSquare className="w-5 h-5" />
            <span>Test Checklist</span>
          </NavLink>
          <NavLink to="/dashboard/proof" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Award className="w-5 h-5" />
            <span>Proof</span>
          </NavLink>
          <NavLink to="/dashboard/ship" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Rocket className="w-5 h-5" />
            <span>Ship</span>
          </NavLink>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Placement Prep</h1>
          <div className="w-10 h-10 bg-primary rounded-full"></div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
