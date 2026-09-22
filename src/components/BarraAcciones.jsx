import React from "react";
import { Stack, Typography, Button, TextField } from "@mui/material";

const BarraAcciones = ({ idFiltro, setIdFiltro, loading, onVerTodos, onBuscarPorId, onEliminar, onActualizar }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
      <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }}>
        Aprendices SENA
      </Typography>
      <Button variant="outlined" color="primary" onClick={onVerTodos} disabled={loading}>
        {loading ? "Cargando..." : "VER TODOS"}
      </Button>
      <TextField
        size="small" label="ID" value={idFiltro}
        onChange={(e) => setIdFiltro(e.target.value)}
        sx={{ width: 120 }}
      />
      <Button variant="outlined" color="secondary" onClick={onBuscarPorId} disabled={loading || !idFiltro}>
        BUSCAR POR ID
      </Button>
      <Button variant="outlined" color="error" onClick={onEliminar} disabled={loading || !idFiltro}>
        ELIMINAR
      </Button>
      <Button variant="outlined" color="primary" onClick={onActualizar} disabled={loading || !idFiltro}>
        ACTUALIZAR
      </Button>
    </Stack>
  );
};

export default BarraAcciones;