import { NavLink } from 'react-router-dom';

export default function Sidebar() {
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
                            Hotel Room's
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
        </aside>
    );
}



