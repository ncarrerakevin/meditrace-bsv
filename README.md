# MediTrace

Blockchain pharmaceutical traceability system using BSV for micropayments.

## Setup

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd meditrace-bsv
   ```

2. **Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file:
   echo "BSV_PRIVATE_KEY=a9ce9b32c26e2dbdf1874a635ba2861f89ad4d6ad495107b6b25e5b56c3a60f3" > .env
   echo "BSV_NETWORK=testnet" >> .env
   
   npm run dev
   ```
   Runs on `http://localhost:3000`

3. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Runs on `http://localhost:5173`

## Project Structure

```
meditrace-bsv/
├── backend/
│   ├── server.js
│   ├── controllers/medicineController.js
│   ├── routes/medicineRoutes.js
│   └── services/
│       ├── blockchainService.js    # BSV integration
│       └── qrService.js           # QR code generation
└── frontend/
    └── src/
        ├── components/            # React components
        └── services/api.js       # API client
```

## API Endpoints

```bash
# Register medicine
POST /api/medicine/register
{
  "name": "Medicine Name",
  "batch": "BATCH001",
  "manufacturer": "Manufacturer",
  "expiryDate": "2025-12-31"
}

# Verify medicine
GET /api/medicine/verify/:medicineId

# Medicine history
GET /api/medicine/history/:medicineId

# Recall medicine
POST /api/medicine/recall
{
  "medicineId": "MED_XXX",
  "reason": "Contamination detected"
}
```

## Features

- **Register medicines** with QR code generation
- **Verify authenticity** via medicine ID or QR scan
- **Track supply chain** with custody transfers
- **Recall system** for contaminated products
- **BSV blockchain** integration with micropayments ($0.0000005 per tx)

## Demo Flow

1. **Register** new medicine → generates QR code
2. **Verify** medicine → shows authentic status
3. **Recall** medicine via API → verification shows warning
4. **History** shows all transactions

## Technologies

- **Backend:** Node.js, Express, BSV SDK
- **Frontend:** React, Vite
- **Blockchain:** BSV (Bitcoin SV)
- **QR Codes:** qrcode library
- **Storage:** In-memory (for demo)



Acknowledgments
Special thanks to Deggen and Áseir for their technical support and guidance in resolving implementation challenges during development.
