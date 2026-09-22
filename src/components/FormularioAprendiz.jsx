import React from "react";
import { Paper, Typography, Stack, TextField, Button } from "@mui/material";

const FormularioAprendiz = ({ form, setForm, onCrear, loading }) => {
  return (
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
        <Button variant="outlined" color="primary" onClick={onCrear} disabled={loading}>
          CREAR
        </Button>
      </Stack>
    </Paper>
  );
};

export default FormularioAprendiz;