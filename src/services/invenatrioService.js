import axios from 'axios';


const API_URL = 'http://localhost:8000/api';

// Función para crear un producto
export const crearProducto = async (productoData) => {
    try {
        const response = await axios.post(`${API_URL}/productos/`, productoData);
        return response.data;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
};

// Función para actualizar un producto
export const actualizarProducto = async (productoId, productoData) => {
    try {
        const response = await axios.put(`${API_URL}/productos/${productoId}/`, productoData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
};

// Función para obtener todas las bodegas
export const obtenerBodegas = async () => {
    try {
        const response = await axios.get(`${API_URL}/bodegas/`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener bodegas:', error);
        throw error;
    }
};

//Funcion para obtener categorias
export const obtenerCategorias = async () => {
    try{
        const response = await axios.get(`${API_URL}/categorias/`);
        return response.data;
    }catch (error){
        console.error('Error al obtener categorias:', error );
        throw error;
    }
};

// Función para crear un inventario
export const crearInventario = async (inventarioData) => {
    try {
        const response = await axios.post(`${API_URL}/inventarios/`, inventarioData);
        return response.data;
    } catch (error) {
        console.error('Error al crear inventario:', error);
        throw error;
    }
};

export const obtenerInventarioPorProducto = async (productoId) => {
    try {
        const response = await axios.get(`${API_URL}/inventarios/?producto=${productoId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener inventario del producto:', error);
        throw error;
    }
};
