import { useState } from 'react';
import { medicineAPI } from '../services/api';

function History() {
    const [medicineId, setMedicineId] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!medicineId) return;

        setLoading(true);
        setHistory(null);

        try {
            const response = await medicineAPI.history(medicineId);
            setHistory(response);
        } catch (error) {
            console.error('Error fetching history:', error);
            alert('Error fetching history');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Medicine History</h2>

            <div className="row justify-content-center">
                <div className="col-lg-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <form onSubmit={handleSearch}>
                                <div className="mb-3">
                                    <label className="form-label">Enter Medicine ID</label>
                                    <input
                                        type="text"
                                        value={medicineId}
                                        onChange={(e) => setMedicineId(e.target.value)}
                                        placeholder="e.g., MED_1752731859378_0ta751d58"
                                        className="form-control"
                                    />
                                    <small className="text-muted">View complete transaction history</small>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !medicineId}
                                    className="btn btn-primary w-100"
                                >
                                    {loading ? 'Searching...' : 'View History'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {history && (
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h4 className="card-title mb-4">
                                    Transaction History
                                    <span className="badge bg-primary ms-2">{history.totalTransactions} transactions</span>
                                </h4>

                                <div className="timeline">
                                    {history.history.map((item, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="d-flex align-items-start">
                                                <div className="me-3 text-center" style={{minWidth: '50px'}}>
                          <span style={{fontSize: '2rem'}}>
                            {item.dataPayload?.type === 'MEDICINE_REGISTRATION' && '📦'}
                              {item.dataPayload?.type === 'CUSTODY_TRANSFER' && '🚚'}
                              {item.dataPayload?.type === 'MEDICINE_RECALL' && '⚠️'}
                          </span>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="alert alert-light mb-0">
                                                        <h6 className="alert-heading mb-1">
                                                            {item.dataPayload?.type?.replace(/_/g, ' ')}
                                                        </h6>
                                                        <p className="mb-1 small text-muted">
                                                            <strong>TX ID:</strong> {item.txId}
                                                        </p>
                                                        <p className="mb-0 small text-muted">
                                                            <strong>Time:</strong> {new Date(item.dataPayload?.timestamp || '').toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default History;