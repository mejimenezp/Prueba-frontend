import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/ventas">Ventas</Link></li>
          <li><Link to="/facturas">Facturas</Link></li>
          <li><Link to="/inventario">Inventario</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
