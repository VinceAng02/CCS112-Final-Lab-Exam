import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    const adminUser = localStorage.getItem('adminUser') || 'Admin';

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        localStorage.removeItem('adminUser');
        navigate('/');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">Final Lab Exam</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/HotelRoomInventory"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            Hotel Rooms
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Reservation"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            Reservation
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-footer">
                <div className="admin-profile-badge">
                    <div className="admin-avatar">A</div>
                    <div className="admin-info">
                        <span className="admin-name">{adminUser}</span>
                        <span className="admin-role">● Administrator</span>
                    </div>
                </div>
                <button type="button" onClick={handleLogout} className="logout-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}



