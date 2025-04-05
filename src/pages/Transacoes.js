import React, { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Grid,
  Paper
} from '@mui/material';
import TransactionList from '../components/TransactionList';

const categoriasDisponiveis = [
  'Todas',
  'Salário',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Educação',
  'Outros',
];

const Transacoes = ({ transactions, onDelete,onMarkAsPaid }) => {
  const [mes, setMes] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  // Filtro por mês e categoria
  const transacoesFiltradas = transactions.filter((t) => {
    const data = new Date(t.data);

    const dataCorresponde =
      !mes ||
      (data.getMonth() + 1 === parseInt(mes.split('-')[1]) &&
        data.getFullYear() === parseInt(mes.split('-')[0]));

    const categoriaCorresponde =
      categoria === 'Todas' || t.categoria === categoria;

    return dataCorresponde && categoriaCorresponde;
  });

  // Cálculo do saldo
  const saldo = transacoesFiltradas.reduce((acc, t) => acc + t.amount, 0);

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>
        Histórico de Transações
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Filtrar por mês"
            type="month"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            select
            label="Filtrar por categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categoriasDisponiveis.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 3,
          textAlign: 'center',
          backgroundColor: saldo >= 0 ? '#e0ffe0' : '#ffe0e0',
          borderLeft: `6px solid ${saldo >= 0 ? 'green' : 'red'}`,
        }}
      >
        <Typography variant="subtitle1">Saldo Atual</Typography>
        <Typography variant="h5" color={saldo >= 0 ? 'green' : 'red'}>
          R$ {saldo.toFixed(2)}
        </Typography>
      </Paper>

      <TransactionList
        transactions={transacoesFiltradas}
        onDelete={onDelete}
        onMarkAsPaid={onMarkAsPaid}
      />
    </Box>
  );
};

export default Transacoes;
