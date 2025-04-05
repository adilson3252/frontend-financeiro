import React from 'react';
import { Typography, Box } from '@mui/material';

const Balance = ({ balance }) => {
  return (
    <Box textAlign="center" my={2}>
      <Typography variant="h6">Saldo Atual</Typography>
      <Typography variant="h4" color={balance >= 0 ? "green" : "red"}>
        R$ {balance.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default Balance;
