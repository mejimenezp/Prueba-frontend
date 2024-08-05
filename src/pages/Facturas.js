import React, { useState, useEffect } from 'react';
import { get } from '../services/apiService';
import Sidebar from '../components/sidebar';
import { Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Sheet } from '@mui/joy';

function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [open, setOpen] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const data = await get('/facturas/');
        setFacturas(data);
      } catch (error) {
        console.error('Error al obtener facturas:', error);
      }
    };

    fetchFacturas();
  }, []);

  const handleOpen = async (venta_id) => {
    console.log('Venta ID:', venta_id); 
    try {
      const url = `/detalleventa/?venta_id=${venta_id}`;
      console.log('URL:', url); 
      const data = await get(url);
      console.log('Data:', data); 
      setDetalleVenta(data);
      setFacturaSeleccionada(venta_id);
      setOpen(true);
    } catch (error) {
      console.error('Error al obtener detalles de la venta:', error);
    }
  };
  

  const handleClose = () => {
    setOpen(false);
    setDetalleVenta([]);
    setFacturaSeleccionada(null);
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
};

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Sheet
        sx={{
          flexGrow: 1,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Facturas
        </Typography>
        <List>
          {facturas.map(factura => (
            <ListItem key={factura.id} secondaryAction={
              <Button variant="contained" onClick={() => handleOpen(factura.venta.id)}>
                Detalle
              </Button>
            }>
              <ListItemText
                primary={`Fecha: ${new Date(factura.fecha).toLocaleDateString()}`}
                secondary={`Total: $${formatPrice(factura.total)}`}
              />
            </ListItem>
          ))}
        </List>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Detalles de la Venta</DialogTitle>
          <DialogContent>
            {detalleVenta.length > 0 ? (
              <List>
                {detalleVenta.map((detalle, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Producto: ${detalle.producto_nombre}`}
                      secondary={`Cantidad: ${detalle.cantidad} - Precio Unitario: $${formatPrice(detalle.precio_unitario)}`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No hay detalles disponibles</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Sheet>
    </div>
  );
}

export default Facturas;
