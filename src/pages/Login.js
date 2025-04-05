import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backend-financeiro.onrender.com/api/login', {
        email,
        senha,
      });

      const { token } = response.data;

      // Salva o token no localStorage
      localStorage.setItem('token', token);

      // Seta estado de autenticação no App
      onLogin();

      // Redireciona para Home
      navigate('/');
    } catch (err) {
      alert('Login inválido!');
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper sx={{ p: 4, width: 300 }}>
        <Typography variant="h6" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
          <Button
              component={Link}
                 to="/register"
                  fullWidth
                sx={{ mt: 1 }}>
  Não tem conta? Cadastrar
</Button>



        </form>
      </Paper>
    </Box>
  );
};

export default Login;
