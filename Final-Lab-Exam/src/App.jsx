import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './component/Sidebar'
import Dashboard from './component/Dashboard'
import Sample1 from './component/Sample-1'
import './App.css'

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sample-1" element={<Sample1 />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

