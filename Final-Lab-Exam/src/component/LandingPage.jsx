import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="landing-container">
            <div className="landing-card">
                <h1 className="landing-title">Welcome to Final Lab Exam</h1>
                <p className="landing-subtitle">Click below to access the dashboard and components.</p>
                <Link to="/dashboard" className="landing-btn">
                    Let's Start
                </Link>
            </div>
        </div>
    );
}


