import React, { useState, useEffect } from 'react';
import { crearProducto,actualizarProducto,obtenerBodegas,crearInventario, obtenerCategorias, obtenerInventarioPorProducto } from '../services/invenatrioService';
import { toast } from 'react-toastify';

const ProductoForm = ({ productoSeleccionado, onClose }) => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: null
    });
    const [bodegas, setBodegas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [mostrarFormularioInventario, setMostrarFormularioInventario] = useState(false);
    const [inventario, setInventario] = useState({
        producto: null,
        cantidad: '',
        bodega: null
    });

    useEffect(() => {
        const fetchBodegas = async () => {
            try {
                const data = await obtenerBodegas();
                setBodegas(data);
            } catch (error) {
                console.error('Error al obtener bodegas:', error);
            }
        };
        fetchBodegas();
    }, []);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await obtenerCategorias();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener categorias:', error);
            }
        };
        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchInventario = async (productoId) => {
            try {
                const inventarioData = await obtenerInventarioPorProducto(productoId);
                setInventario({
                    producto: productoId,
                    cantidad: inventarioData.cantidad || '',
                    bodega: inventarioData.bodega || null
                });
            } catch (error) {
                console.error('Error al obtener inventario del producto:', error);
                setInventario({
                    producto: productoId,
                    cantidad: '',
                    bodega: null
                });
            }
        };

            if (productoSeleccionado) {
                console.log (productoSeleccionado)
                setProducto({
                    nombre: productoSeleccionado.producto_nombre,
                    descripcion: productoSeleccionado.descripcion,
                    precio: productoSeleccionado.precio,
                    categoria: productoSeleccionado.categoria
                });

                if (productoSeleccionado.inventario) {
                    setInventario({
                        producto: productoSeleccionado.id,
                        cantidad: productoSeleccionado.inventario.cantidad,
                        bodega: productoSeleccionado.inventario.bodega
                    });
                } else {
                    fetchInventario(productoSeleccionado.id);
                }
            }
    }, [productoSeleccionado])

    

    const handleProductoChange = (e) => {
        const { name, value } = e.target;
        setProducto((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInventarioChange = (e) => {
        const { name, value } = e.target;
        setInventario((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitProducto = async (e) => {
        e.preventDefault();
        try {
            if (productoSeleccionado) {
                await actualizarProducto(productoSeleccionado.id, producto);
                toast.success('Producto actualizado exitosamente');
                onClose();
            } else {
                const nuevoProducto = await crearProducto(producto);
                setProducto({ ...producto, id: nuevoProducto.id });
                setMostrarFormularioInventario(true);
                toast.success('Producto Creado exitosamente');
                
            }
            
        } catch (error) {
            console.error('Error al crear o actualizar producto:', error);
        }
    };

    const handleSubmitInventario = async (e) => {
        e.preventDefault();
        try {
            await crearInventario({ ...inventario, producto: producto.id });
            toast.success('Inventario Creado exitosamente');
            onClose();  
        } catch (error) {
            console.error('Error al crear inventario:', error);
        }
    };

    return (
        <div>
            <h1>{productoSeleccionado ? 'Actualizar Producto' : 'Crear Producto'}</h1>
            <form onSubmit={handleSubmitProducto}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleProductoChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleProductoChange}
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={producto.precio}
                        onChange={handleProductoChange}
                        required
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <select
                        name="categoria"
                        value={producto.categoria}
                        onChange={handleProductoChange}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{productoSeleccionado ? 'Actualizar Producto' : 'Crear Producto'}</button>
            </form>

            {!productoSeleccionado && mostrarFormularioInventario && (
                <>
                    <h2>Crear Inventario</h2>
                    <form onSubmit={handleSubmitInventario}>
                        <div>
                            <label>Cantidad:</label>
                            <input
                                type="number"
                                name="cantidad"
                                value={inventario.cantidad}
                                onChange={handleInventarioChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Bodega:</label>
                            <select
                                name="bodega"
                                value={inventario.bodega}
                                onChange={handleInventarioChange}
                                required
                            >
                                <option value="">Seleccione una bodega</option>
                                {bodegas.map((bodega) => (
                                    <option key={bodega.id} value={bodega.id}>
                                        {bodega.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Crear Inventario</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default ProductoForm;