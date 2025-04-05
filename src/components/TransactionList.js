import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ErrorIcon from '@mui/icons-material/Error';

const TransactionList = ({ transactions, onDelete, onMarkAsPaid }) => {
  const incomes = transactions.filter((t) => t.amount > 0);
  const expenses = transactions.filter((t) => t.amount < 0);

  const renderList = (title, data, isIncome) => (
    <Box my={3}>
      <Typography variant="h6">{title}</Typography>
      <List>
        {data.map((t, index) => {
          const globalIndex = transactions.indexOf(t);
          const isAberto = t.status === 'Em aberto';
          const vencida =
            isAberto && new Date(t.vencimento) < new Date();

          return (
            <ListItem
              key={index}
              sx={{
                borderLeft: `5px solid ${isIncome ? 'green' : 'red'}`,
                mb: 1,
                bgcolor: '#f9f9f9',
                borderRadius: 1,
              }}
              secondaryAction={
                <>
                  {isAberto && typeof onMarkAsPaid === 'function' && (
                    <Tooltip title="Marcar como pago">
                      <IconButton
                        edge="end"
                        onClick={() => onMarkAsPaid(globalIndex)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Excluir">
                    <IconButton
                      edge="end"
                      onClick={() => onDelete(globalIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
            >
              <ListItemText
                primary={`${t.description} — ${t.categoria}`}
                secondary={
                  <>
                    <span style={{ color: isIncome ? 'green' : 'red' }}>
                      {isIncome ? '+' : '-'} R$ {Math.abs(t.amount).toFixed(2)}
                    </span>
                    <br />
                    <span style={{ fontSize: '0.85em', color: '#555' }}>
                      Vencimento: {new Date(t.vencimento).toLocaleDateString('pt-BR')}
                      <br />
                      Status:{' '}
                      {t.status === 'Pago' ? (
                        <span style={{
                          color: 'green',
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}>
                          <CheckCircleIcon fontSize="small" style={{ marginRight: 4 }} />
                          Pago
                        </span>
                      ) : vencida ? (
                        <span style={{
                          color: 'red',
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}>
                          <ErrorIcon fontSize="small" style={{ marginRight: 4 }} />
                          Vencida
                        </span>
                      ) : (
                        <span style={{
                          color: 'orange',
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}>
                          <HourglassBottomIcon fontSize="small" style={{ marginRight: 4 }} />
                          Em aberto
                        </span>
                      )}
                    </span>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {renderList('Receitas', incomes, true)}
      {renderList('Despesas', expenses, false)}
    </>
  );
};

export default TransactionList;
