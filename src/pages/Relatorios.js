import React, { useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button
} from '@mui/material';
import * as XLSX from 'xlsx';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#FF6384'];

const categoriasDisponiveis = [
  'Todas',
  'Salário',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Educação',
  'Outros',
];

const Relatorios = ({ transactions }) => {
  const [mes, setMes] = useState('');
  const [categoria, setCategoria] = useState('Todas');

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

  const despesas = transacoesFiltradas.filter((t) => t.amount < 0);
  const receitas = transacoesFiltradas.filter((t) => t.amount > 0);

  const agruparPorCategoria = (dados) => {
    const resultado = {};
    dados.forEach(({ categoria, amount }) => {
      if (!resultado[categoria]) resultado[categoria] = 0;
      resultado[categoria] += Math.abs(amount);
    });
    return Object.entries(resultado).map(([categoria, total]) => ({
      categoria,
      total,
    }));
  };

  const dataDespesas = agruparPorCategoria(despesas);
  const dataReceitas = agruparPorCategoria(receitas);

  const dataComparativo = [...new Set([
    ...dataDespesas.map(d => d.categoria),
    ...dataReceitas.map(r => r.categoria)
  ])].map(cat => ({
    categoria: cat,
    Receitas: dataReceitas.find(r => r.categoria === cat)?.total || 0,
    Despesas: dataDespesas.find(d => d.categoria === cat)?.total || 0,
  }));

  const saldo = transacoesFiltradas.reduce((acc, t) => acc + t.amount, 0);

  const exportarParaExcel = () => {
    const dados = transacoesFiltradas.map((t) => ({
      Data: new Date(t.data).toLocaleDateString('pt-BR'),
      Descrição: t.description,
      Categoria: t.categoria,
      Tipo: t.amount > 0 ? 'Receita' : 'Despesa',
      Valor: `R$ ${Math.abs(t.amount).toFixed(2)}`
    }));

    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");

    XLSX.writeFile(wb, `relatorio-financeiro.xlsx`);
  };

  return (
    <Box my={4}>
      <Typography variant="h5" gutterBottom>Relatórios</Typography>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Filtrar por mês"
            type="month"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
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

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={exportarParaExcel}>
          Exportar para Excel
        </Button>
      </Box>

      {/* SALDO TOTAL */}
      <Box
        sx={{
          p: 2,
          mb: 3,
          textAlign: 'center',
          backgroundColor: saldo >= 0 ? '#e0ffe0' : '#ffe0e0',
          borderLeft: `6px solid ${saldo >= 0 ? 'green' : 'red'}`,
          borderRadius: 1
        }}
      >
        <Typography variant="subtitle1">Saldo Total</Typography>
        <Typography variant="h5" color={saldo >= 0 ? 'green' : 'red'}>
          R$ {saldo.toFixed(2)}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb={1}>Distribuição das Despesas</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataDespesas}
                dataKey="total"
                nameKey="categoria"
                outerRadius={100}
                label
              >
                {dataDespesas.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" mb={1}>Receitas vs Despesas por Categoria</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataComparativo}>
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Receitas" fill="#00C49F" />
              <Bar dataKey="Despesas" fill="#FF6384" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Relatorios;
