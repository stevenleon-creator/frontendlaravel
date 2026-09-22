import axios from "axios";

const API_URL = "http://localhost:8000/api/aprendices-mongo";

export const getAprendices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearAprendiz = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const getAprendizById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const eliminarAprendiz = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const actualizarAprendiz = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Objeto exportado por defecto para App.jsx
const aprendizMongoService = {
  getAprendices,
  crearAprendiz,
  getAprendizById,
  eliminarAprendiz,
  actualizarAprendiz,
};

export default aprendizMongoService;