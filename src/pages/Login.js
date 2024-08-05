import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { CssBaseline, Typography, FormControl, FormLabel, Input, Button, Sheet } from '@mui/joy';
import '../styles/Login.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      const response = await login(credentials);
      if (response.access) {
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        navigate('/ventas');
      }
    } catch (error) {
      console.error('Error de autenticación', error);
    }
  };

  return (
    <div className="login-container">
      <CssBaseline />
      
      <Sheet
        sx={{
          width: 300,
          mx: 'auto',
          my: 4, 
          py: 3, 
          px: 2, 
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        
        <Typography level="h4" component="h1" className="login-title">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit} className="login-form">
          <FormControl>
            <FormLabel>Usuario</FormLabel>
            <Input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" sx={{ mt: 2 }}>
            Iniciar Sesión
          </Button>
        </form>
      </Sheet>
    </div>
  );
}

export default Login;
