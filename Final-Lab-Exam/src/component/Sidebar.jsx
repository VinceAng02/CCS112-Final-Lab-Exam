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
                            to="/sample-1"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            Sample 1
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sample-2"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            Sample 2
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}



