import axios from "axios";


export const getReports = async () => {
    const response = await axios.get('http://localhost:3000/api/reports'); 
    return response.data;
}

export const addReport = async (report) => {
    const response = await axios.post('/api/reports', report);
    return response.data;
}

export const deleteReport = async (id) => {
    const response = await axios.delete(`/api/reports/${id}`);
    return response.data;
}

export const updateReport = async (id, report) => {
    const response = await axios.put(`/api/reports/${id}`, report);
    return response.data;
}