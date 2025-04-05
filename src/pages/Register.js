import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await axios.post('https://backend-financeiro.onrender.com/api/register', {
            email,
            senha,
          });
          

      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err) {
      alert('Erro ao cadastrar: ' + err.response?.data?.error || 'Erro desconhecido');
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <Paper sx={{ p: 4, width: 300 }}>
        <Typography variant="h6" gutterBottom>Cadastro</Typography>
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
            Cadastrar
          </Button>
          <Button
            component={Link}
            to="/login"
            fullWidth
            sx={{ mt: 1 }}
          >
            Já tem conta? Fazer login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
