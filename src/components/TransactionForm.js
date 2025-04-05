import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';

const categorias = [
  'Salário',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Educação',
  'Outros',
];

const TransactionForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [categoria, setCategoria] = useState('');
  const [vencimento, setVencimento] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !categoria || !vencimento) return;

    onAdd({
      description,
      amount: parseFloat(amount),
      categoria,
      data: new Date().toISOString(), // data de criação
      vencimento,
      status: 'Em aberto',
    });

    // limpar campos
    setDescription('');
    setAmount('');
    setCategoria('');
    setVencimento('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Valor (negativo = despesa)"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Categoria</InputLabel>
        <Select
          value={categoria}
          label="Categoria"
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map((cat, index) => (
            <MenuItem key={index} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Vencimento"
        type="date"
        value={vencimento}
        onChange={(e) => setVencimento(e.target.value)}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ mt: 2 }}
      >
        Adicionar
      </Button>
    </Box>
  );
};

export default TransactionForm;
