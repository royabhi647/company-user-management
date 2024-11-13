import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchCompanies = () => axios.get(`${API_URL}/companies`);
export const createCompany = (data) => axios.post(`${API_URL}/companies`, data);
export const deleteCompany = (id) => axios.delete(`${API_URL}/companies/${id}`);
export const updateCompany = (id, data) => axios.put(`${API_URL}/companies/${id}`, data);

export const fetchUsers = (companyId) => axios.get(`${API_URL}/users/${companyId}`);
export const createUser = (data) => axios.post(`${API_URL}/users`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);
export const updateUser = (id, data) => axios.put(`${API_URL}/users/${id}`, data);