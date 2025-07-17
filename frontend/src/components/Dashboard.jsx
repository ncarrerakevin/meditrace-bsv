import { useEffect, useState } from 'react';

function Dashboard() {
    const [stats, setStats] = useState({
        registered: 0,
        verified: 0,
        recalls: 0
    });

    useEffect(() => {
        setStats({
            registered: 247,
            verified: 1893,
            recalls: 3
        });
    }, []);

    return (
        <div className="container">
            <h2 className="mb-4">MediTrace Dashboard</h2>

            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Medicines Registered</h6>
                                    <h2 className="text-primary mb-0">{stats.registered}</h2>
                                </div>
                                <span style={{fontSize: '3rem'}}>📦</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Verifications Today</h6>
                                    <h2 className="text-success mb-0">{stats.verified}</h2>
                                </div>
                                <span style={{fontSize: '3rem'}}>✅</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-muted mb-2">Active Recalls</h6>
                                    <h2 className="text-danger mb-0">{stats.recalls}</h2>
                                </div>
                                <span style={{fontSize: '3rem'}}>⚠️</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <h4 className="card-title mb-4">Recent Activity</h4>

                    <div className="list-group list-group-flush">
                        <div className="list-group-item px-0">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <span className="me-3" style={{fontSize: '1.5rem'}}>✅</span>
                                    <div>
                                        <h6 className="mb-1">Medicine Verified</h6>
                                        <small className="text-muted">MED_1752731859378_0ta751d58</small>
                                    </div>
                                </div>
                                <small className="text-muted">2 min ago</small>
                            </div>
                        </div>

                        <div className="list-group-item px-0">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <span className="me-3" style={{fontSize: '1.5rem'}}>📦</span>
                                    <div>
                                        <h6 className="mb-1">New Medicine Registered</h6>
                                        <small className="text-muted">Suero Fisiológico 0.9%</small>
                                    </div>
                                </div>
                                <small className="text-muted">15 min ago</small>
                            </div>
                        </div>

                        <div className="list-group-item px-0 bg-danger bg-opacity-10">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <span className="me-3" style={{fontSize: '1.5rem'}}>⚠️</span>
                                    <div>
                                        <h6 className="mb-1 text-danger">Medicine Recalled</h6>
                                        <small className="text-muted">Contamination detected</small>
                                    </div>
                                </div>
                                <small className="text-muted">1 hour ago</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;