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
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }}>
            Aprendices SENA
          </Typography>
          <Button variant="outlined" color="primary" onClick={fetchTodos} disabled={loading}>
            {loading ? "Cargando..." : "VER TODOS"}
          </Button>
          <TextField
            size="small" label="ID" value={idFiltro}
            onChange={(e) => setIdFiltro(e.target.value)}
            sx={{ width: 120 }}
          />
          <Button variant="outlined" color="secondary" onClick={fetchPorId} disabled={loading || !idFiltro}>
            BUSCAR POR ID
          </Button>
          <Button variant="outlined" color="error" onClick={handleEliminar} disabled={loading || !idFiltro}>
            ELIMINAR
          </Button>
          <Button variant="outlined" color="primary" onClick={handleActualizar} disabled={loading || !idFiltro}>
            ACTUALIZAR
          </Button>
        </Stack>

        <Paper elevation={2} sx={{ p: 2, mb: 3, maxWidth: 480, mx: "auto" }}>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>Crear aprendiz</Typography>
          <Stack spacing={2}>
            <TextField label="Nombre" value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
            <TextField label="Apellidos" value={form.apellidos}
              onChange={(e) => setForm({ ...form, apellidos: e.target.value })} />
            <TextField label="Edad" type="number" value={form.edad}
              onChange={(e) => setForm({ ...form, edad: e.target.value })} />
            <TextField label="Género" value={form.genero}
              onChange={(e) => setForm({ ...form, genero: e.target.value })} />
            <TextField label="Ciudad" value={form.ciudad}
              onChange={(e) => setForm({ ...form, ciudad: e.target.value })} />
            <TextField label="País" value={form.pais}
              onChange={(e) => setForm({ ...form, pais: e.target.value })} />
            <Button variant="outlined" color="primary" onClick={handleCrear} disabled={loading}>
              CREAR
            </Button>
          </Stack>
        </Paper>

        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#39A900" }}>
                {["ID", "Nombre", "Apellidos", "Edad", "Género", "Ciudad", "País"].map((h) => (
                  <TableCell key={h} sx={{ color: "#fff", fontWeight: 700 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={row.id ?? i}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.apellidos}</TableCell>
                  <TableCell>{row.edad}</TableCell>
                  <TableCell>{row.genero}</TableCell>
                  <TableCell>{row.ciudad}</TableCell>
                  <TableCell>{row.pais}</TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">Sin registros</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}

export default App;