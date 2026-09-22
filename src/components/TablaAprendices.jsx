import React from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";

const TablaAprendices = ({ data }) => {
  return (
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
  );
};

export default TablaAprendices;