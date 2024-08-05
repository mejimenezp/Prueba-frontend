import { post } from './apiService';
import axios from 'axios';


export async function crearVenta(detallesVenta) {
  try {
    const response = await post('ventas/', { detalleventa_set: detallesVenta });
    return response;
  } catch (error) {
    console.error('Error al crear la venta:', error);
    throw error;
  }
}


export async function obtenerVentas() {
  try {
    const response = await axios.get('ventas/');
    return response;
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    throw error;
  }
}
