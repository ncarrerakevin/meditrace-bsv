const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicineController');

// Registrar nueva medicina
router.post('/register', medicineController.registerMedicine);

// Transferir custodia
router.post('/transfer', medicineController.transferCustody);

// Verificar medicina (escaneo QR)
router.get('/verify/:medicineId', medicineController.verifyMedicine);

// Obtener historial
router.get('/history/:medicineId', medicineController.getMedicineHistory);

// Recall medicina
router.post('/recall', medicineController.recallMedicine);

// Health check
router.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'MediTrace API' });
});

module.exports = router;