import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const medicineAPI = {
    // Registrar nueva medicina
    register: async (medicineData) => {
        const response = await api.post('/medicine/register', medicineData);
        return response.data;
    },

    // Verificar medicina
    verify: async (medicineId) => {
        const response = await api.get(`/medicine/verify/${medicineId}`);
        return response.data;
    },

    // Transferir custodia
    transfer: async (transferData) => {
        const response = await api.post('/medicine/transfer', transferData);
        return response.data;
    },

    // Obtener historial
    history: async (medicineId) => {
        const response = await api.get(`/medicine/history/${medicineId}`);
        return response.data;
    },

    // Recall medicina
    recall: async (recallData) => {
        const response = await api.post('/medicine/recall', recallData);
        return response.data;
    }
};

export default api;