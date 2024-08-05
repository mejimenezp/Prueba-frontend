import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Ventas from './pages/Ventas';
import Facturas from './pages/Facturas';
import Inventario from './pages/Inventario';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/inventario" element={<Inventario />} />
      </Routes>
      <ToastContainer />
    </Router>
    
  );
}

export default App;
