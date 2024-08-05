import React, { useEffect, useState } from 'react';
import { get } from '../services/apiService';
import axios from 'axios';
import { obtenerCategorias } from '../services/invenatrioService';
import Sidebar from '../components/sidebar'; 
import {TextField,MenuItem,Button,List,ListItem,ListItemText,ListItemButton} from '@mui/material';
import {toast} from 'react-toastify'

const Ventas = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const categoriasData = await obtenerCategorias(); 
        setCategorias(categoriasData);

        const productosData = await get('/productos/');
        setProductos(productosData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchDatos();
  }, []);



  const handleAgregarProducto = () => {
    if (productoSeleccionado && cantidad) {
      const producto = productos.find(p => p.id === parseInt(productoSeleccionado));
      if (producto) {
        const seleccionado = {
          ...producto,
          cantidad: parseInt(cantidad),
          subtotal: parseInt(cantidad) * producto.precio
        };
        setSeleccionados([...seleccionados, seleccionado]);
        setProductoSeleccionado('');
        setCantidad('');
      }
    }
  };

  const handleEliminarProducto = (index) => {
    const nuevosSeleccionados = [...seleccionados];
    nuevosSeleccionados.splice(index, 1);
    setSeleccionados(nuevosSeleccionados);
  };

  const handleRealizarCompra = async () => {
    try {
      const venta = {
        detalleventa_set: seleccionados.map(p => ({
          producto: p.id,
          cantidad: p.cantidad
        }))
      };

      const response = await axios.post('http://localhost:8000/api/ventas/', venta);
      console.log('Compra realizada:', response.data);
      toast.success('Compra realizada');
      toast.info('Factura Generada');
    } catch (error) {
        console.error('Error al realizar la compra:', error);

    let errorMessage = 'Error desconocido';
    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || 'Error desconocido';
    } else if (error.message) {
      errorMessage = error.message;
    }
    toast.error(`Error al realizar la compra: ${errorMessage}`);
  }
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO').format(price);
};

    const handleCategoriaChange = (event) => {
        setCategoriaSeleccionada(event.target.value);
    };
    const productosFiltrados = productos.filter(producto =>
        categoriaSeleccionada ? producto.categoria === categoriaSeleccionada : true
    );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '16px' }}>
        <h1>Ventas</h1>
        <div>
        <TextField
            select
            label="Categoría"
            value={categoriaSeleccionada}
            onChange={handleCategoriaChange}
            helperText="Seleccione una categoría"
            fullWidth
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Producto"
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
            helperText="Seleccione un producto"
            fullWidth
            required
          >
            {productosFiltrados.map((producto) => (
              <MenuItem key={producto.id} value={producto.id}>
                {producto.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Cantidad"
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            fullWidth
            required
          />
          <Button variant="contained" onClick={handleAgregarProducto}>
            Agregar
          </Button>
        </div>
        <h2>Productos Seleccionados</h2>
        <List>
          {seleccionados.map((producto, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${producto.nombre} - Cantidad: ${producto.cantidad} - precio unitario: ${formatPrice(producto.precio)}  - Subtotal: ${formatPrice(producto.subtotal)}`}
              />
              <ListItemButton onClick={() => handleEliminarProducto(index)}>
                Eliminar
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" onClick={handleRealizarCompra}>
          Realizar Compra
        </Button>
      </div>
    </div>
  );
};

export default Ventas;
