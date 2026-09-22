import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api/aprendices";

export const getAprendices = async () => {
  const res = await axios.get(API_BASE);
  return res.data || [];
};

export const getAprendizPorId = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const crearAprendiz = async (form) => {
  const res = await axios.post(API_BASE, form, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const actualizarAprendiz = async (id, form) => {
  const res = await axios.put(`${API_BASE}/${id}`, form, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const eliminarAprendiz = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};