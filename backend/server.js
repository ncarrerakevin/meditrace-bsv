require('dotenv').config();
const express = require('express');
const cors = require('cors');
const medicineRoutes = require('./routes/medicineRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/medicine', medicineRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'MediTrace API',
        version: '1.0.0',
        endpoints: {
            register: 'POST /api/medicine/register',
            transfer: 'POST /api/medicine/transfer',
            verify: 'GET /api/medicine/verify/:medicineId',
            history: 'GET /api/medicine/history/:medicineId',
            recall: 'POST /api/medicine/recall'
        }
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 MediTrace API running on http://localhost:${PORT}`);
    console.log(`📡 BSV Network: ${process.env.BSV_NETWORK || 'testnet'}`);
    console.log(`✅ Ready for blockchain transactions!`);
});