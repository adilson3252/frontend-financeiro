import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const IncomeExpense = ({ income, expense }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: 10 }}>
          <Typography variant="subtitle1">Entradas</Typography>
          <Typography color="green">+ R$ {income.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: 10 }}>
          <Typography variant="subtitle1">Saídas</Typography>
          <Typography color="red">- R$ {expense.toFixed(2)}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default IncomeExpense;
