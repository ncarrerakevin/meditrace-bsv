import { Link, useLocation } from 'react-router-dom';

function Navigation() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <span className="me-2">💊</span>
                    <strong className="text-primary">MediTrace</strong>
                </Link>

                <div className="navbar-nav ms-auto">
                    <Link
                        to="/"
                        className={`nav-link px-3 ${location.pathname === '/' ? 'active text-primary fw-bold' : ''}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/register"
                        className={`nav-link px-3 ${location.pathname === '/register' ? 'active text-primary fw-bold' : ''}`}
                    >
                        Register
                    </Link>
                    <Link
                        to="/scanner"
                        className={`nav-link px-3 ${location.pathname === '/scanner' ? 'active text-primary fw-bold' : ''}`}
                    >
                        Verify
                    </Link>
                    <Link
                        to="/history"
                        className={`nav-link px-3 ${location.pathname === '/history' ? 'active text-primary fw-bold' : ''}`}
                    >
                        History
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;