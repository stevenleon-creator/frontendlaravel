import React, { useState } from "react";
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Button, TextField, Stack, CssBaseline, Tabs, Tab
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as ServiceMySQL from "./services/aprendices.service";
import * as ServiceMongo from "./services/aprendicesMongo.service";
import TablaAprendices from "./components/TablaAprendices";
import FormularioAprendiz from "./components/FormularioAprendiz";
import BarraAcciones from "./components/BarraAcciones";

const theme = createTheme({
  palette: {
    primary: { main: "#39A900" },
    secondary: { main: "#00304D" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
  },
});

function App() {
  const [origen, setOrigen] = useState("mysql"); // "mysql" o "mongo"
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "", apellidos: "", edad: "", genero: "", ciudad: "", pais: ""
  });
  const [idFiltro, setIdFiltro] = useState("");

  const service = origen === "mysql" ? ServiceMySQL : ServiceMongo;

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const aprendices = await service.getAprendices();
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
      const aprendiz = await service.getAprendizPorId(idFiltro);
      setData(aprendiz ? [aprendiz] : []);
      if (aprendiz) setForm(aprendiz);
    } catch { setData([]); } finally { setLoading(false); }
  };

  const handleCrear = async () => {
    try {
      setLoading(true);
      await service.crearAprendiz(form);
      setForm({ nombre: "", apellidos: "", edad: "", genero: "", ciudad: "", pais: "" });
      await fetchTodos();
    } catch (e) { console.error("Error creando aprendiz:", e); }
    finally { setLoading(false); }
  };

  const handleActualizar = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      await service.actualizarAprendiz(idFiltro, form);
      setForm({ nombre: "", apellidos: "", edad: "", genero: "", ciudad: "", pais: "" });
      await fetchTodos();
    } catch (e) { console.error("Error actualizando aprendiz:", e); }
    finally { setLoading(false); }
  };

  const handleEliminar = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      await service.eliminarAprendiz(idFiltro);
      await fetchTodos();
    } catch (e) { console.error("Error eliminando aprendiz:", e); }
    finally { setLoading(false); }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
        <Tabs
          value={origen}
          onChange={(e, nuevoValor) => {
            setOrigen(nuevoValor);
            setData([]);
            setIdFiltro("");
          }}
          sx={{ mb: 2 }}
        >
          <Tab label="MySQL" value="mysql" />
          <Tab label="MongoDB" value="mongo" />
        </Tabs>
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