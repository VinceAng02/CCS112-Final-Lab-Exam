import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Sidebar from './component/Sidebar'
import Dashboard from './component/Dashboard'
import Sample1 from './component/Sample-1'
import Sample2 from './component/Sample-2'
import LandingPage from './component/LandingPage'
import './App.css'

function DashboardLayout() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sample-1" element={<Sample1 />} />
          <Route path="/sample-2" element={<Sample2 />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

