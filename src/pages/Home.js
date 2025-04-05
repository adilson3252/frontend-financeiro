import React from 'react';
import { Typography, Box } from '@mui/material';
import TransactionForm from '../components/TransactionForm';

const Home = ({ onAdd }) => {
  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>Adicionar Transação</Typography>
      <TransactionForm onAdd={onAdd} />
    </Box>
  );
};

export default Home;
