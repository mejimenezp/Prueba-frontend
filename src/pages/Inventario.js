import React, { useState, useEffect } from 'react';
import { get } from '../services/apiService';
import ProductoForm from '../components/productoform';
import Sidebar from '../components/sidebar';
import { DialogActions, Dialog, DialogTitle, DialogContent,TextField,MenuItem } from '@mui/material';
import { Button, Typography, List, ListItem, Sheet } from '@mui/joy';
import '../styles/Inventario.css';

const Inventario = () => {
    const [inventarios, setInventarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [bodegas, setBodegas] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [bodegaSeleccionada, setBodegaSeleccionada] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await get('/productos/');
                setProductos(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        const fetchInventario = async () => {
            try {
                const data = await get('/inventarios/');
                setInventarios(data);
            } catch (error) {
                console.error('Error al obtener inventarios:', error);
            }
        };

        const fetchCategorias = async () => {
            try {
                const data = await get('/categorias/');
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener categorias:', error);
            }
        };

        const fetchBodegas = async () => {
            try {
                const data = await get('/bodegas/');
                setBodegas(data);
            } catch (error) {
                console.error('Error al obtener bodegas:', error);
            }
        };

        fetchProductos();
        fetchInventario();
        fetchCategorias();
        fetchBodegas();
    }, []);

    const handleCategoriaChange = (e) => {
        setCategoriaSeleccionada(e.target.value);
    };

    const handleBodegaChange = (e) => {
        setBodegaSeleccionada(e.target.value);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO').format(price);
    };

    const manejarMostrarFormulario = (producto = null) => {
        setProductoSeleccionado(producto);
        setMostrarFormulario(true);
    };

    const handleClose = () => {
        setMostrarFormulario(false);
        setProductoSeleccionado(null);
    };

    const productosFiltrados = productos.filter((producto) => {
        const inventarioItem = inventarios.find(i => i.producto === producto.id) || {};
        const cumpleCategoria = categoriaSeleccionada ? producto.categoria === categoriaSeleccionada : true;
        const cumpleBodega = bodegaSeleccionada ? inventarioItem.bodega === bodegaSeleccionada : true;
        return cumpleCategoria && cumpleBodega;
    });

    return (
        <Sheet sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            <Sidebar />
            <Sheet sx={{ flexGrow: 1, p: 2 }}>
                <Typography level="h4" component="h1" className="inventario-title">
                    Lista de Inventarios
                </Typography>
                <div>
                    <TextField
                        select
                        label="Categoría"
                        value={categoriaSeleccionada}
                        onChange={handleCategoriaChange}
                        helperText="Seleccione una categoría"
                        fullWidth
                    >
                        <MenuItem value="">
                            Todas las categorías
                        </MenuItem>
                        {categorias.map((categoria) => (
                            <MenuItem key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField
                        select
                        label="Filtrar por Bodega"
                        value={bodegaSeleccionada}
                        onChange={handleBodegaChange}
                        helperText="Seleccione una bodega"
                        fullWidth
                    >
                        <MenuItem value="">
                            Todas las bodegas
                        </MenuItem>
                        {bodegas.map((bodega) => (
                            <MenuItem key={bodega.id} value={bodega.id}>
                                {bodega.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <Button variant="solid" onClick={() => manejarMostrarFormulario()}>
                    Crear Producto
                </Button>
                <List>
                    {productosFiltrados.map((producto) => {
                        const inventarioItem = inventarios.find(i => i.producto === producto.id) || {};
                        return (
                            <ListItem key={producto.id} className="inventario-item">
                                <div className="inventario-text">
                                    <Typography level="body1">
                                        {producto.nombre} - Cantidad: {inventarioItem.cantidad || 'No disponible'} - Precio Unitario: {formatPrice(producto.precio)}
                                    </Typography>
                                    <Typography level="body2">
                                        Bodega: {inventarioItem.bodega_nombre || 'No asignada'}
                                    </Typography>
                                </div>
                                <Button
                                    variant="outlined"
                                    onClick={() => manejarMostrarFormulario(producto)}
                                >
                                    Actualizar
                                </Button>
                            </ListItem>
                        );
                    })}
                </List>

                <Dialog
                    open={mostrarFormulario}
                    onClose={handleClose}
                    aria-labelledby="producto-form-dialog"
                >
                    <DialogTitle id="producto-form-dialog">
                        {productoSeleccionado ? 'Actualizar Producto' : 'Crear Producto'}
                    </DialogTitle>
                    <DialogContent>
                        <ProductoForm
                            productoSeleccionado={productoSeleccionado}
                            onClose={handleClose}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined">
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Sheet>
        </Sheet>
    );
};

export default Inventario;