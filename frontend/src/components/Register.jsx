import { useState } from 'react';
import { medicineAPI } from '../services/api';
import QRCode from 'qrcode';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        batch: '',
        manufacturer: '',
        expiryDate: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [qrCode, setQrCode] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await medicineAPI.register(formData);
            setResult(response);

            const qrDataUrl = await QRCode.toDataURL(response.medicineId);
            setQrCode(qrDataUrl);

            setFormData({
                name: '',
                batch: '',
                manufacturer: '',
                expiryDate: '',
                description: ''
            });
        } catch (error) {
            console.error('Error registering medicine:', error);
            alert('Error registering medicine');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Register New Medicine</h2>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="card-title mb-4">Medicine Information</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Medicine Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="e.g., Suero Fisiológico 0.9%"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Batch Number *</label>
                                    <input
                                        type="text"
                                        name="batch"
                                        value={formData.batch}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="e.g., LOT2025-001"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Manufacturer *</label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="e.g., Laboratorios Demo S.A."
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Expiry Date *</label>
                                    <input
                                        type="date"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="form-control"
                                        placeholder="Additional details..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100"
                                >
                                    {loading ? 'Registering...' : 'Register Medicine'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            {result ? (
                                <div className="text-center">
                                    <div className="mb-4">
                                        <span className="text-success" style={{fontSize: '4rem'}}>✅</span>
                                        <h4 className="text-success mt-3">Medicine Registered Successfully!</h4>
                                    </div>

                                    <div className="alert alert-light mb-3">
                                        <small className="text-muted">Medicine ID:</small>
                                        <div className="text-break fw-bold small">{result.medicineId}</div>
                                    </div>

                                    <div className="alert alert-light mb-3">
                                        <small className="text-muted">Transaction ID:</small>
                                        <div className="text-break small">{result.txId}</div>
                                    </div>

                                    {qrCode && (
                                        <div className="mb-3">
                                            <p className="text-muted mb-2">QR Code:</p>
                                            <img src={qrCode} alt="QR Code" className="img-fluid" style={{maxWidth: '250px'}} />
                                            <p className="text-muted small mt-2">
                                                Print this QR code on the medicine package
                                            </p>
                                        </div>
                                    )}

                                    <div className="alert alert-info">
                                        <small>💰 Transaction fee: $0.000001 (1 satoshi)</small>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <span style={{fontSize: '5rem', opacity: 0.5}}>📦</span>
                                    <h5 className="mt-3 text-muted">Ready to Register</h5>
                                    <p className="text-muted small">
                                        Fill the form to register a new medicine<br/>
                                        Each registration is permanently stored on BSV blockchain
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;