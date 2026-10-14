import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Sidebar from './component/Sidebar'
import Dashboard from './component/Dashboard'
import Reservation from './component/Reservaton'
import HotelRoomInventory from './component/HotelRoomInventory'
import Authentication from './component/Authentication'
import './App.css'

function DashboardLayout() {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/HotelRoomInventory" element={<HotelRoomInventory />} />
          <Route path="/hotel-room-inventory" element={<HotelRoomInventory />} />
          <Route path="/Reservation" element={<Reservation />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/sample-1" element={<Reservation />} />
          <Route path="/sample-2" element={<HotelRoomInventory />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

