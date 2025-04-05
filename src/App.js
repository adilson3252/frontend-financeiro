import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
} from '@mui/material';
import axios from 'axios';

import Home from './pages/Home';
import Transacoes from './pages/Transacoes';
import Relatorios from './pages/Relatorios';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });

  // 👇 Carregar transações do backend com token JWT
  useEffect(() => {
    const fetchTransacoes = async () => {
      if (!isAuthenticated) return;

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/transacoes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchTransacoes();
  }, [isAuthenticated]);

  // ✅ Enviar transação para o backend
  const handleAddTransaction = async (t) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:4000/api/transacoes',
        t,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions([response.data, ...transactions]);
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  };

  const handleDeleteTransaction = (indexToDelete) => {
    // Ainda sem backend para deletar — apenas atualiza local
    const updated = transactions.filter((_, index) => index !== indexToDelete);
    setTransactions(updated);
  };

  const handleMarkAsPaid = (indexToUpdate) => {
    // Ainda sem backend para editar — apenas atualiza local
    const updated = transactions.map((t, index) =>
      index === indexToUpdate ? { ...t, status: 'Pago' } : t
    );
    setTransactions(updated);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    setTransactions([]);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Lançamento
              </Button>
              <Button color="inherit" component={Link} to="/transacoes">
                Transações
              </Button>
              <Button color="inherit" component={Link} to="/relatorios">
                Relatórios
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Cadastro
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home onAdd={handleAddTransaction} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/transacoes"
            element={
              isAuthenticated ? (
                <Transacoes
                  transactions={transactions}
                  onDelete={handleDeleteTransaction}
                  onMarkAsPaid={handleMarkAsPaid}
                />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/relatorios"
            element={
              isAuthenticated ? (
                <Relatorios transactions={transactions} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
