import React, { useState } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Button, TextField, Stack, CssBaseline
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  getAprendices,
  getAprendizPorId,
  crearAprendiz,
  actualizarAprendiz,
  eliminarAprendiz,
} from "./services/aprendices.service";
import TablaAprendices from "./components/TablaAprendices";
import FormularioAprendiz from "./components/FormularioAprendiz";
import BarraAcciones from "./components/BarraAcciones";
const theme = createTheme({
  palette: {
    primary: { main: "#39A900" },   // verde SENA
    secondary: { main: "#00304D" }, // azul oscuro SENA
    background: { default: "#f5f5f5", paper: "#ffffff" },
  },
});

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "", apellidos: "", edad: "", genero: "", ciudad: "", pais: ""
  });
  const [idFiltro, setIdFiltro] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const aprendices = await getAprendices();
      setData(aprendices);
    } catch (e) {
      console.error("Error cargando aprendices:", e);
      setData([]);
    } finally { setLoading(false); }
  };

  const fetchPorId = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      const aprendiz = await getAprendizPorId(idFiltro);
      setData(aprendiz ? [aprendiz] : []);
      if (aprendiz) setForm(aprendiz);
    } catch { setData([]); } finally { setLoading(false); }
  };

  const handleCrear = async () => {
    try {
      setLoading(true);
      await crearAprendiz(form);
      setForm({ nombre: "", apellidos: "", edad: "", genero: "", ciudad: "", pais: "" });
      await fetchTodos();
    } catch (e) { console.error("Error creando aprendiz:", e); }
    finally { setLoading(false); }
  };

  const handleActualizar = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      await actualizarAprendiz(idFiltro, form);
      setForm({ nombre: "", apellidos: "", edad: "", genero: "", ciudad: "", pais: "" });
      await fetchTodos();
    } catch (e) { console.error("Error actualizando aprendiz:", e); }
    finally { setLoading(false); }
  };

  const handleEliminar = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      await eliminarAprendiz(idFiltro);
      await fetchTodos();
    } catch (e) { console.error("Error eliminando aprendiz:", e); }
    finally { setLoading(false); }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
       <BarraAcciones
        idFiltro={idFiltro}
        setIdFiltro={setIdFiltro}
        loading={loading}
        onVerTodos={fetchTodos}
        onBuscarPorId={fetchPorId}
        onEliminar={handleEliminar}
        onActualizar={handleActualizar}
/>
        <FormularioAprendiz form={form} setForm={setForm} onCrear={handleCrear} loading={loading} />
        <TablaAprendices data={data} />
      </Box>
    </ThemeProvider>
  );
}

export default App;