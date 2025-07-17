const blockchainService = require('../services/blockchainService');
const qrService = require('../services/qrService');

class MedicineController {
    // POST /api/medicine/register
    async registerMedicine(req, res) {
        try {
            const { name, batch, manufacturer, expiryDate, description } = req.body;

            // Validación básica
            if (!name || !batch || !manufacturer || !expiryDate) {
                return res.status(400).json({
                    error: 'Missing required fields'
                });
            }

            // Registrar en blockchain
            const result = await blockchainService.registerMedicine({
                name,
                batch,
                manufacturer,
                expiryDate,
                description,
                registeredAt: new Date().toISOString()
            });

            // Generar QR
            const qrCode = await qrService.generateQR(result.medicineId);

            res.status(201).json({
                success: true,
                medicineId: result.medicineId,
                txId: result.txId,
                qrCode,
                message: 'Medicine registered successfully'
            });

        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // POST /api/medicine/transfer
    async transferCustody(req, res) {
        try {
            const { medicineId, from, to, notes } = req.body;

            if (!medicineId || !from || !to) {
                return res.status(400).json({
                    error: 'Missing required fields'
                });
            }

            const result = await blockchainService.transferCustody(
                medicineId,
                { name: from, timestamp: new Date().toISOString(), notes },
                { name: to, timestamp: new Date().toISOString() }
            );

            res.json({
                success: true,
                txId: result.txId,
                message: `Custody transferred from ${from} to ${to}`
            });

        } catch (error) {
            console.error('Transfer error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // GET /api/medicine/verify/:medicineId
    async verifyMedicine(req, res) {
        try {
            const { medicineId } = req.params;

            const result = await blockchainService.verifyMedicine(medicineId);

            if (!result.verified) {
                return res.status(404).json({
                    verified: false,
                    message: 'Medicine not found or counterfeit'
                });
            }

            // Simulación de micropago
            console.log(`💰 Micropayment processed: $${result.fee}`);

            res.json({
                verified: true,
                medicine: result.medicine,
                custodyChain: result.history,
                verificationFee: result.fee,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Verification error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // GET /api/medicine/history/:medicineId
    async getMedicineHistory(req, res) {
        try {
            const { medicineId } = req.params;

            const history = await blockchainService.getMedicineHistory(medicineId);

            if (history.length === 0) {
                return res.status(404).json({
                    message: 'No history found for this medicine'
                });
            }

            res.json({
                medicineId,
                totalTransactions: history.length,
                history,
                lastUpdate: history[history.length - 1].timestamp
            });

        } catch (error) {
            console.error('History error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // POST /api/medicine/recall
    async recallMedicine(req, res) {
        try {
            const { medicineId, reason } = req.body;

            if (!medicineId || !reason) {
                return res.status(400).json({
                    error: 'Missing required fields'
                });
            }

            const result = await blockchainService.recallMedicine(medicineId, reason);

            res.json({
                success: true,
                txId: result.txId,
                message: 'Medicine recalled successfully',
                alert: 'All parties in custody chain have been notified'
            });

        } catch (error) {
            console.error('Recall error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new MedicineController();