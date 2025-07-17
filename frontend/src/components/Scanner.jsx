import { useState } from 'react';
import { medicineAPI } from '../services/api';

function Scanner() {
    const [medicineId, setMedicineId] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!medicineId) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await medicineAPI.verify(medicineId);
            setResult(response);
        } catch (error) {
            console.error('Error verifying medicine:', error);
            setResult({
                verified: false,
                message: 'Error verifying medicine'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Verify Medicine</h2>

            <div className="row justify-content-center">
                <div className="col-lg-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <form onSubmit={handleVerify}>
                                <div className="mb-3">
                                    <label className="form-label">Enter Medicine ID</label>
                                    <input
                                        type="text"
                                        value={medicineId}
                                        onChange={(e) => setMedicineId(e.target.value)}
                                        placeholder="e.g., MED_1752731859378_0ta751d58"
                                        className="form-control"
                                    />
                                    <small className="text-muted">Scan QR code or enter ID manually</small>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !medicineId}
                                    className="btn btn-primary w-100"
                                >
                                    {loading ? 'Verifying...' : 'Verify Medicine'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {result && (
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className={`card border-0 shadow ${result.verified ? 'border-success' : 'border-danger'}`}>
                            <div className="card-body p-4">
                                {result.verified ? (
                                    <>
                                        <div className="text-center mb-4">
                                            <span className="text-success" style={{fontSize: '4rem'}}>✅</span>
                                            <h3 className="text-success mt-3">Authentic Medicine</h3>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <div className="alert alert-light">
                                                    <small className="text-muted d-block">Name</small>
                                                    <strong>{result.medicine.name}</strong>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <div className="alert alert-light">
                                                    <small className="text-muted d-block">Batch</small>
                                                    <strong>{result.medicine.batch}</strong>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <div className="alert alert-light">
                                                    <small className="text-muted d-block">Manufacturer</small>
                                                    <strong>{result.medicine.manufacturer}</strong>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <div className="alert alert-light">
                                                    <small className="text-muted d-block">Expiry Date</small>
                                                    <strong>{new Date(result.medicine.expiryDate).toLocaleDateString()}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        {result.medicine.status === 'RECALLED' && (
                                            <div className="alert alert-danger">
                                                <h5 className="alert-heading">⚠️ WARNING: Medicine Recalled!</h5>
                                                <p className="mb-0">{result.medicine.recallReason}</p>
                                            </div>
                                        )}

                                        <div className="alert alert-info">
                                            <small>
                                                💰 Verification fee: $0.000001 (1 satoshi)<br/>
                                                ✓ Verified on BSV blockchain at {new Date().toLocaleString()}
                                            </small>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-4">
                                        <span className="text-danger" style={{fontSize: '4rem'}}>❌</span>
                                        <h3 className="text-danger mt-3">Medicine Not Found</h3>
                                        <p className="text-muted mt-3">
                                            This medicine is not registered in the blockchain or may be counterfeit.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Scanner;