const QRCode = require('qrcode');

class QRService {
    async generateQR(medicineId) {
        try {
            // URL que escanearía el usuario
            const scanUrl = `https://meditrace.app/verify/${medicineId}`;

            // Generar QR con opciones personalizadas
            const qrCodeDataUrl = await QRCode.toDataURL(scanUrl, {
                errorCorrectionLevel: 'H',
                type: 'image/png',
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            return qrCodeDataUrl;
        } catch (error) {
            console.error('QR Generation error:', error);
            throw error;
        }
    }

    // Generar QR para imprimir (alta resolución)
    async generatePrintableQR(medicineId) {
        const scanUrl = `https://meditrace.app/verify/${medicineId}`;

        const qrCodeBuffer = await QRCode.toBuffer(scanUrl, {
            errorCorrectionLevel: 'H',
            type: 'image/png',
            width: 1000,
            margin: 4
        });

        return qrCodeBuffer;
    }
}

module.exports = new QRService();