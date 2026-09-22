import React, { useState } from "react";
import { Box, CssBaseline, Tabs, Tab } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as MysqlService from "./services/aprendices.service";
import * as MongoService from "./services/aprendicesMongo.service";
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
  const [fuente, setFuente] = useState("mysql"); // "mysql" o "mongo"
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "", apellidos: "", edad: "", genero: "", ciudad: "", pais: ""
  });
  const [idFiltro, setIdFiltro] = useState("");

  const service = fuente === "mysql" ? MysqlService : MongoService;

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
          value={fuente}
          onChange={(e, nuevo) => { setFuente(nuevo); setData([]); }}
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